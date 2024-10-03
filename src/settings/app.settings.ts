import { config } from 'dotenv';
import * as process from 'process';

config();

export enum PATH {
  GAME = 'game',
}

export const CONFIG = {
  DB_URL: process.env.DB_URL as string,
  DB_NAME: process.env.DB_NAME as string,
  MONGO_URL: process.env.MONGO_URL as string,
};

export const GAME_CONFIG = {
  TIME: 30,
  TOTAL_ITEMS: 12,
  BONUS: 30,
} as const;
