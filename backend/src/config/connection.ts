import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'sqldb',
  process.env.DB_USER ?? 'root',
  process.env.DB_PASSWORD ?? '120704',
  {
    host: process.env.DB_HOST ?? 'localhost',
    dialect: 'postgres', 
    logging: false,
  }
);

export default sequelize;
