import sequelize from './connection';

export const initDb = async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.error('Unable to initialize database', e);
    process.exitCode = 1;
  }
};
