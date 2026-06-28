"use client";

import * as React from "react";

const YOUTUBE_PLAYLIST_ID = "PLbtikly6et8WoDb0PjDzg13LHCLuw7JdM";
const FALLBACK_AUDIO_SRC = "/music/theme.mp3";
const STORAGE_KEY = "portfolio-music:last-video-id";
const DEBUG_MUSIC = process.env.NODE_ENV !== "production";

type YouTubePlayerState = {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState?: () => number;
  setLoop: (loop: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
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

export function useMusicPlayer() {
  const [playing, setPlaying] = React.useState(false);
  const [playerReady, setPlayerReady] = React.useState(false);
  const [fallbackActive, setFallbackActive] = React.useState(false);
  const playerHostRef = React.useRef<HTMLDivElement>(null);
  const fallbackAudioRef = React.useRef<HTMLAudioElement>(null);
  const playerRef = React.useRef<YouTubePlayerState | null>(null);
  const shouldPlayRef = React.useRef(false);
  const hasStartedRef = React.useRef(false);
  const destroyedRef = React.useRef(false);
  const fallbackTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const playFallback = React.useCallback(async () => {
    const audio = fallbackAudioRef.current;

    if (!audio) {
      return false;
    }

    try {
      await audio.play();
      setFallbackActive(true);
      setPlaying(true);
      return true;
    } catch {
      setFallbackActive(true);
      setPlaying(false);
      return false;
    }
  }, []);

  const startFromStoredTrack = React.useCallback(() => {
    const player = playerRef.current;

    if (!player) return false;

    const storedVideoId = readStoredVideoId();
    const playlist = player.getPlaylist?.() ?? [];

    if (storedVideoId) {
      const storedIndex = playlist.indexOf(storedVideoId);

      if (storedIndex >= 0) {
        player.playVideoAt(storedIndex);
        hasStartedRef.current = true;
        return true;
      }
    }

    player.playVideo();
    hasStartedRef.current = true;
    return true;
  }, []);

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

    async function initPlayer() {
      try {
        await loadYouTubeIframeApi();

        if (cancelled || destroyedRef.current || !playerHostRef.current || !window.YT?.Player) {
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
              logMusicStep("YouTube player ready");

              try {
                event.target.setLoop(true);
                event.target.setShuffle(true);
                event.target.cuePlaylist({
                  listType: "playlist",
                  list: YOUTUBE_PLAYLIST_ID,
                  index: 0,
                });
                logMusicStep("Playlist cued", YOUTUBE_PLAYLIST_ID);
              } catch {
                logMusicStep("Playlist cue failed, using fallback");
                // If setup fails, we fall back below.
              }

              setPlayerReady(true);

              if (shouldPlayRef.current) {
                pauseFallback();
                logMusicStep("Autoplay requested, starting playlist");
                startFromStoredTrack();
                setPlaying(true);
              }
            },
            onStateChange: (event: { data: number; target: YouTubePlayerState }) => {
              if (cancelled || destroyedRef.current) return;

              const player = event.target;
              playerRef.current = player;

              if (event.data === window.YT?.PlayerState.PLAYING) {
                clearFallbackTimer();
                pauseFallback();
                setPlaying(true);
                setFallbackActive(false);
                hasStartedRef.current = true;
                saveVideoId(player.getVideoData?.().video_id);
                logMusicStep("YouTube playback started", player.getVideoData?.().video_id);
                return;
              }

              if (event.data === window.YT?.PlayerState.PAUSED) {
                setPlaying(false);
                saveVideoId(player.getVideoData?.().video_id);
                logMusicStep("YouTube playback paused", player.getVideoData?.().video_id);
                return;
              }

              if (event.data === window.YT?.PlayerState.ENDED) {
                saveVideoId(player.getVideoData?.().video_id);
                logMusicStep("YouTube playback ended", player.getVideoData?.().video_id);
              }
            },
            onError: () => {
              logMusicStep("YouTube player error");
              void activateFallback();
            },
          },
        });
      } catch {
        if (!cancelled && !destroyedRef.current) {
          logMusicStep("YouTube player init failed, activating fallback");
          void activateFallback();
        }
      }
    }

    void initPlayer();

    return () => {
      cancelled = true;
      destroyedRef.current = true;
      clearFallbackTimer();

      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore teardown failures.
      }
    };
  }, [activateFallback, clearFallbackTimer, pauseFallback, startFromStoredTrack]);

  const toggleMusic = React.useCallback(() => {
    const player = playerRef.current;

    if (playing) {
      shouldPlayRef.current = false;
      setPlaying(false);
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
    logMusicStep("Music toggle on", {
      playerReady,
      hasStarted: hasStartedRef.current,
    });

    if (playerReady && player) {
      clearFallbackTimer();
      const started = hasStartedRef.current
        ? resumeCurrentTrack()
        : startFromStoredTrack();

      if (started) {
        setFallbackActive(false);
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
    }, 2500);
  }, [
    clearFallbackTimer,
    pauseFallback,
    playFallback,
    playerReady,
    playing,
    resumeCurrentTrack,
    startFromStoredTrack,
  ]);

  return {
    fallbackActive,
    fallbackAudioRef,
    playing,
    playerHostRef,
    playerReady,
    toggleMusic,
  };
}

export const MUSIC_FALLBACK_AUDIO_SRC = FALLBACK_AUDIO_SRC;
