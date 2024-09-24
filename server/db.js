const Sequelize = require('sequelize').Pool;

const sequelize = new Sequelize({
  user: 'admin',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

module.exports = sequelize;
