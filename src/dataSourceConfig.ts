import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'confloss',
  password: 'confloss',
  database: 'confloss',
  entities: [join(__dirname, '**', '*.entity.{js,ts}')],
  synchronize: false,
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
};
