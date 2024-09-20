import { config } from 'dotenv';
import * as process from 'process';

config();

export enum PATH {
  GAME = 'game',
}

export const CONFIG = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  DB_NAME: process.env.DB_NAME as string,
  MONGO_URL: process.env.MONGO_URL as string,
};
