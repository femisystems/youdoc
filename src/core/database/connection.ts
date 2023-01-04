import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { config as dbConfig } from './config';

type DBConfig = Record<
  string,
  {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: Dialect;
    use_env_variable?: string;
    ssl?: boolean;
    dialectOptions?: Record<string, any>;
  }
>;

const env: string = process.env.NODE_ENV ?? 'development';
const config = (dbConfig as unknown as DBConfig)[env];

const sequelize = config.use_env_variable
  ? new Sequelize(config.use_env_variable)
  : new Sequelize({ ...config });

sequelize.addModels([__dirname + '/models']);

export default sequelize;
