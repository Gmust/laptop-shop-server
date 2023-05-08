import { registerAs } from '@nestjs/config';
import { sqlConfig } from './sql.config';

export const dbConfig = registerAs('database', () => ({
  sql: {
    ...sqlConfig(),
  },
}));