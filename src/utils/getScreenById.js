import { screenMeta } from '../data/screenMeta';

export function getScreenById(screenId) {
  return screenMeta[screenId] ?? null;
}
