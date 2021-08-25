import { Sequelize } from 'sequelize';

const SequelizeConnection = new Sequelize({
  dialect: 'sqlite',
  database: 'Monitor',
  storage: '../DB/Monitor.db'
});

export default SequelizeConnection;