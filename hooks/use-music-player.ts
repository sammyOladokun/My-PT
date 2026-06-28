"use client";

import * as React from "react";

const YOUTUBE_PLAYLIST_ID = "PLbtikly6et8WoDb0PjDzg13LHCLuw7JdM";
const YOUTUBE_PLAYLIST_IDS = [
  YOUTUBE_PLAYLIST_ID,
  "PLbtikly6et8Xsfdzaclebd8yLaR7VIPPN",
  "PLbtikly6et8WZp9JfihDBjJ3jwXmp0oic",
  "PLbtikly6et8XuKQfsf_okZm-Y6ARlYMX-",
];
const FALLBACK_AUDIO_SRC = "/music/theme.mp3";
const STORAGE_KEY = "portfolio-music:last-video-id";
const PLAYLIST_STORAGE_KEY = "portfolio-music:last-playlist-id";
const SHUFFLE_STORAGE_KEY = "portfolio-music:shuffle-enabled";
const FALLBACK_DELAY_MS = 20000;
const PLAYER_READY_TIMEOUT_MS = 15000;
const DEBUG_MUSIC = process.env.NODE_ENV !== "production";

type YouTubePlayerState = {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState?: () => number;
  setLoop: (loop: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
  loadPlaylist: (options: {
    listType?: "playlist" | "user_uploads";
    list: string;
    index?: number;
    startSeconds?: number;
  }) => void;
  playVideoAt: (index: number) => void;
  cuePlaylist: (options: {
    listType?: "playlist" | "user_uploads";
    list: string;
    index?: number;
    startSeconds?: number;
  }) => void;
  getPlaylist: () => string[];
  getVideoData: () => { video_id?: string };
  destroy: () => void;
};

type YouTubePlayerConstructor = new (
  element: HTMLElement,
  options: Record<string, unknown>,
) => YouTubePlayerState;

declare global {
  interface Window {
    YT?: {
      Player: YouTubePlayerConstructor;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function readStoredVideoId() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveVideoId(videoId: string | undefined) {
  if (typeof window === "undefined" || !videoId) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, videoId);
  } catch {
    // Ignore storage failures.
  }
}

function readStoredPlaylistId() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(PLAYLIST_STORAGE_KEY);
  } catch {
    return null;
  }
}

function savePlaylistId(playlistId: string | undefined) {
  if (typeof window === "undefined" || !playlistId) return;

  try {
    window.localStorage.setItem(PLAYLIST_STORAGE_KEY, playlistId);
  } catch {
    // Ignore storage failures.
  }
}

function readStoredShuffleEnabled() {
  if (typeof window === "undefined") return true;

  try {
    const storedValue = window.localStorage.getItem(SHUFFLE_STORAGE_KEY);

    if (storedValue === null) return true;

    return storedValue === "true";
  } catch {
    return true;
  }
}

function saveShuffleEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SHUFFLE_STORAGE_KEY, String(enabled));
  } catch {
    // Ignore storage failures.
  }
}

function logMusicStep(step: string, details?: unknown) {
  if (!DEBUG_MUSIC) return;

  if (details === undefined) {
    console.debug(`[music] ${step}`);
    return;
  }

  console.debug(`[music] ${step}`, details);
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires a browser"));
  }

  if (window.YT?.Player) {
    logMusicStep("YouTube iframe API already available");
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-youtube-iframe-api="true"]',
    );

    const settleOnReady = () => {
      if (window.YT?.Player) {
        resolve();
        return true;
      }

      return false;
    };

    if (settleOnReady()) return;

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      logMusicStep("YouTube iframe API ready callback fired");
      resolve();
    };

    if (existingScript) {
      existingScript.addEventListener(
        "error",
        () => reject(new Error("YouTube API script failed to load")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.dataset.youtubeIframeApi = "true";
    script.onerror = () => {
      logMusicStep("YouTube iframe API failed to load");
      reject(new Error("YouTube API script failed to load"));
    };
    document.head.appendChild(script);
  });
}

function pickRandomPlaylistId() {
  const availablePlaylistIds = YOUTUBE_PLAYLIST_IDS.filter(Boolean);

  if (availablePlaylistIds.length === 0) {
    return YOUTUBE_PLAYLIST_ID;
  }

  return availablePlaylistIds[Math.floor(Math.random() * availablePlaylistIds.length)];
}

export function useMusicPlayer() {
  const [playing, setPlaying] = React.useState(false);
  const [playerReady, setPlayerReady] = React.useState(false);
  const [fallbackActive, setFallbackActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const playerHostRef = React.useRef<HTMLDivElement>(null);
  const fallbackAudioRef = React.useRef<HTMLAudioElement>(null);
  const playerRef = React.useRef<YouTubePlayerState | null>(null);
  const activePlaylistIdRef = React.useRef<string>(YOUTUBE_PLAYLIST_ID);
  const shouldPlayRef = React.useRef(false);
  const hasStartedRef = React.useRef(false);
  const cancelledRef = React.useRef(false);
  const destroyedRef = React.useRef(false);
  const fallbackTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadHandleRef = React.useRef<number | ReturnType<typeof setTimeout> | null>(null);
  const readyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTrackTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseFallback = React.useCallback(() => {
    const audio = fallbackAudioRef.current;

    if (!audio) return;

    audio.pause();
  }, []);

  const clearFallbackTimer = React.useCallback(() => {
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
  }, []);

  const clearStartTrackTimer = React.useCallback(() => {
    if (startTrackTimerRef.current) {
      clearTimeout(startTrackTimerRef.current);
      startTrackTimerRef.current = null;
    }
  }, []);

  const playFallback = React.useCallback(async () => {
    const audio = fallbackAudioRef.current;

    if (!audio) {
      return false;
    }

    try {
      await audio.play();
      setFallbackActive(true);
      setLoading(false);
      setPlaying(true);
      return true;
    } catch {
      setFallbackActive(true);
      setLoading(false);
      setPlaying(false);
      return false;
    }
  }, []);

  const loadPlaylistById = React.useCallback((player: YouTubePlayerState, playlistId: string) => {
    activePlaylistIdRef.current = playlistId;
    savePlaylistId(playlistId);
    player.loadPlaylist({
      listType: "playlist",
      list: playlistId,
    });
    logMusicStep("Playlist loaded", playlistId);
  }, []);

  const startFromStoredOrRandomTrack = React.useCallback((playlistId?: string) => {
    const player = playerRef.current;

    if (!player) return false;

    const storedPlaylistId = readStoredPlaylistId();
    const selectedPlaylistId =
      playlistId ??
      (storedPlaylistId && YOUTUBE_PLAYLIST_IDS.includes(storedPlaylistId)
        ? storedPlaylistId
        : pickRandomPlaylistId());

    if (activePlaylistIdRef.current !== selectedPlaylistId) {
      loadPlaylistById(player, selectedPlaylistId);
    }

    clearStartTrackTimer();

    const startWithRetry = (attempt: number) => {
      const currentPlayer = playerRef.current;

      if (!currentPlayer || cancelledRef.current || destroyedRef.current) {
        return;
      }

      const playlist = currentPlayer.getPlaylist?.() ?? [];

      if (playlist.length > 0) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        currentPlayer.playVideoAt(randomIndex);
        hasStartedRef.current = true;
        logMusicStep("Starting from random playlist index", {
          randomIndex,
          playlistLength: playlist.length,
          playlistId: selectedPlaylistId,
        });
        return;
      }

      if (attempt < 6) {
        logMusicStep("Waiting for playlist to populate before start", {
          attempt,
          playlistId: selectedPlaylistId,
        });
        startTrackTimerRef.current = setTimeout(() => {
          startWithRetry(attempt + 1);
        }, 150);
        return;
      }

      currentPlayer.playVideo();
      hasStartedRef.current = true;
      logMusicStep("Playlist still empty after retries; using default start", {
        playlistId: selectedPlaylistId,
      });
    };

    startWithRetry(0);
    return true;
  }, [clearStartTrackTimer, loadPlaylistById]);

  const applyShufflePreference = React.useCallback(
    (player: YouTubePlayerState) => {
      const shuffleEnabled = readStoredShuffleEnabled();
      player.setShuffle(shuffleEnabled);
      logMusicStep("Shuffle preference applied", { shuffleEnabled });
      return shuffleEnabled;
    },
    [],
  );

  const resumeCurrentTrack = React.useCallback(() => {
    const player = playerRef.current;

    if (!player) return false;

    player.playVideo();
    hasStartedRef.current = true;
    return true;
  }, []);

  const activateFallback = React.useCallback(async () => {
    clearFallbackTimer();
    setFallbackActive(true);
    logMusicStep("Fallback activated");
    const player = playerRef.current;

    try {
      player?.pauseVideo?.();
    } catch {
      // Ignore player pause failures.
    }

    return playFallback();
  }, [clearFallbackTimer, playFallback]);

  React.useEffect(() => {
    let cancelled = false;
    cancelledRef.current = false;
    destroyedRef.current = false;

    async function initPlayer() {
      try {
        logMusicStep("Starting YouTube player init", {
          hasHost: Boolean(playerHostRef.current),
          hasPlayer: Boolean(window.YT?.Player),
        });
        await loadYouTubeIframeApi();

        if (cancelled || destroyedRef.current || !playerHostRef.current || !window.YT?.Player) {
          logMusicStep("Skipping player init after API load", {
            cancelled,
            destroyed: destroyedRef.current,
            hasHost: Boolean(playerHostRef.current),
            hasPlayer: Boolean(window.YT?.Player),
          });
          return;
        }

        playerRef.current = new window.YT.Player(playerHostRef.current, {
          width: "1",
          height: "1",
          videoId: "",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            enablejsapi: 1,
            iv_load_policy: 3,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
            list: YOUTUBE_PLAYLIST_ID,
            listType: "playlist",
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: { target: YouTubePlayerState }) => {
              if (cancelled || destroyedRef.current) return;

              playerRef.current = event.target;
              clearFallbackTimer();
              if (readyTimeoutRef.current) {
                clearTimeout(readyTimeoutRef.current);
                readyTimeoutRef.current = null;
              }
              logMusicStep("YouTube player ready");

              try {
                const storedPlaylistId = readStoredPlaylistId();
                const selectedPlaylistId =
                  storedPlaylistId && YOUTUBE_PLAYLIST_IDS.includes(storedPlaylistId)
                    ? storedPlaylistId
                    : pickRandomPlaylistId();

                event.target.setLoop(true);
                applyShufflePreference(event.target);
                loadPlaylistById(event.target, selectedPlaylistId);
              } catch {
                logMusicStep("Playlist cue failed, using fallback");
                // If setup fails, we fall back below.
              }

              setPlayerReady(true);

              if (shouldPlayRef.current && !fallbackActive) {
                pauseFallback();
                logMusicStep("Autoplay requested, starting playlist");
                startFromStoredOrRandomTrack(activePlaylistIdRef.current);
                setPlaying(true);
              } else if (fallbackActive) {
                logMusicStep("Fallback already active; deferring playlist start");
              }
            },
            onStateChange: (event: { data: number; target: YouTubePlayerState }) => {
              if (cancelled || destroyedRef.current) return;

              const player = event.target;
              playerRef.current = player;

              if (event.data === window.YT?.PlayerState.PLAYING) {
                clearFallbackTimer();
                pauseFallback();
                setLoading(false);
                setPlaying(true);
                setFallbackActive(false);
                hasStartedRef.current = true;
                saveVideoId(player.getVideoData?.().video_id);
                savePlaylistId(activePlaylistIdRef.current);
                logMusicStep("YouTube playback started", player.getVideoData?.().video_id);
                return;
              }

              if (event.data === window.YT?.PlayerState.PAUSED) {
                setPlaying(false);
                setLoading(false);
                saveVideoId(player.getVideoData?.().video_id);
                savePlaylistId(activePlaylistIdRef.current);
                logMusicStep("YouTube playback paused", player.getVideoData?.().video_id);
                return;
              }

              if (event.data === window.YT?.PlayerState.ENDED) {
                saveVideoId(player.getVideoData?.().video_id);
                savePlaylistId(activePlaylistIdRef.current);
                logMusicStep("YouTube playback ended", player.getVideoData?.().video_id);
                return;
              }

              logMusicStep("YouTube state changed", {
                state: event.data,
                videoId: player.getVideoData?.().video_id,
              });
            },
            onError: (event: { data?: number }) => {
              logMusicStep("YouTube player error", event?.data);
              setLoading(false);
              void activateFallback();
            },
          },
        });

        readyTimeoutRef.current = setTimeout(() => {
          if (!cancelled && !destroyedRef.current && !playerReady) {
            logMusicStep("YouTube player still not ready after timeout", {
              hasHost: Boolean(playerHostRef.current),
              hasPlayer: Boolean(playerRef.current),
            });
          }
        }, PLAYER_READY_TIMEOUT_MS);
      } catch (error) {
        if (!cancelled && !destroyedRef.current) {
          logMusicStep("YouTube player init failed, activating fallback", error);
          void activateFallback();
        }
      }
    }

    const schedulePreload = () => {
      if (typeof window === "undefined") return;

      const runPreload = () => {
        void initPlayer();
      };

      const schedule = () => {
        if (typeof window.requestIdleCallback === "function") {
          preloadHandleRef.current = window.requestIdleCallback(runPreload, {
            timeout: 6000,
          });
          return;
        }

        preloadHandleRef.current = window.setTimeout(runPreload, 1800);
      };

      if (document.readyState === "complete") {
        schedule();
        return;
      }

      window.addEventListener(
        "load",
        () => {
          schedule();
        },
        { once: true },
      );
    };

    schedulePreload();

    return () => {
      cancelled = true;
      cancelledRef.current = true;
      destroyedRef.current = true;
      clearFallbackTimer();
      clearStartTrackTimer();

      if (preloadHandleRef.current !== null) {
        if (typeof window !== "undefined" && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(preloadHandleRef.current as number);
        } else {
          clearTimeout(preloadHandleRef.current);
        }

        preloadHandleRef.current = null;
      }

      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }

      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore teardown failures.
      }
    };
  }, [activateFallback, clearFallbackTimer, pauseFallback]);

  const toggleMusic = React.useCallback(() => {
    const player = playerRef.current;

    if (playing) {
      shouldPlayRef.current = false;
      setPlaying(false);
      setLoading(false);
      pauseFallback();
      logMusicStep("Music paused by user");

      try {
        player?.pauseVideo?.();
      } catch {
        // Ignore player pause failures.
      }

      return;
    }

    shouldPlayRef.current = true;
    setLoading(true);
    logMusicStep("Music toggle on", {
      playerReady,
      hasStarted: hasStartedRef.current,
    });

      if (playerReady && player) {
        if (fallbackActive) {
          setLoading(false);
          logMusicStep("Fallback already active; keeping fallback in control");
          return;
        }

      clearFallbackTimer();
      const started = hasStartedRef.current
        ? resumeCurrentTrack()
        : startFromStoredOrRandomTrack();

      if (started) {
        setFallbackActive(false);
        if (player) {
          applyShufflePreference(player);
        }
        setPlaying(true);
        pauseFallback();
        logMusicStep("Resumed YouTube playback");
        return;
      }
    }

    clearFallbackTimer();
    logMusicStep("Waiting briefly before fallback");
    fallbackTimeoutRef.current = setTimeout(() => {
      if (!shouldPlayRef.current || playerReady) return;

      logMusicStep("YouTube not ready in time; starting fallback");
      void playFallback();
    }, FALLBACK_DELAY_MS);
  }, [
    clearFallbackTimer,
    pauseFallback,
    playFallback,
    playerReady,
    fallbackActive,
    playing,
    applyShufflePreference,
    resumeCurrentTrack,
    startFromStoredOrRandomTrack,
  ]);

  return {
    fallbackActive,
    fallbackAudioRef,
    loading,
    playing,
    playerHostRef,
    playerReady,
    toggleMusic,
  };
}

export const MUSIC_FALLBACK_AUDIO_SRC = FALLBACK_AUDIO_SRC;
