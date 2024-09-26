import { GAME_CONFIG } from '../../../settings/app.settings';

export const calculatePlayerRating = (
  score: number,
  remainingTime: number,
): number => {
  const { TOTAL_ITEMS, TIME, BONUS } = GAME_CONFIG;

  if (score === 0) return 0;
  const efficiency = (score / TOTAL_ITEMS) * 100;
  const timeBonus = (remainingTime / TIME) * BONUS;

  return efficiency + timeBonus;
};
