import * as dotenv from 'dotenv';
import { kill } from 'process';
import { RedisModuleOptions } from './redis.interface';

const ENV_FILE = `.env`;

dotenv.config({ path: ENV_FILE });

export const redisOptionsModuleFactory = (): RedisModuleOptions => {
  const options: RedisModuleOptions = {
    config: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: () => {
        kill(process.pid, 'SIGTERM');
      },
    },
  };
  return options;
};
