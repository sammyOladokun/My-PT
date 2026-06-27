import { rm } from 'fs/promises';

try {
  await rm('.next', { recursive: true, force: true });
} catch (error) {
  console.warn('Unable to clear .next before dev start:', error);
}
