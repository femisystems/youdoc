import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: {
      dbname: process.env.DEV_DB
      username: process.env.DEV_USER
      password: process.env.DEV_PASS
    },
    options: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        max: 0,
        idle: 10000
      }
    }
  },
  test: {
    db: {
      dbname: process.env.DEV_DB
      username: process.env.DEV_USER
      password: process.env.DEV_PASS
    },
    options: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        max: 0,
        idle: 10000
      }
    }
  },
  production: {
    db: {
      dbname: process.env.DEV_DB
      username: process.env.DEV_USER
      password: process.env.DEV_PASS
    },
    options: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        max: 0,
        idle: 10000
      }
    }
  },
};

export default config[env];