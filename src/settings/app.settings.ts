import { config } from 'dotenv';
import * as process from 'process';

config();

export enum PATH {
  GAME = 'game',
  USERS = 'users',
  AUTH = 'auth',
}

export const CONFIG = {
  DB_URL: process.env.DB_URL as string,
  DB_NAME: process.env.DB_NAME as string,
  MONGO_URL: process.env.MONGO_URL as string,
  LOGIN_CRED: process.env.LOGIN_CRED as string,
  PASS_CRED: process.env.PASS_CRED as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ACCESS_TTL: process.env.ACCESS_TTL as string,
  REFRESH_TTL: process.env.REFRESH_TTL as string,
};

export const GAME_CONFIG = {
  TIME: 30,
  TOTAL_ITEMS: 9,
  BONUS: 30,
} as const;
