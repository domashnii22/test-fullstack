const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'admin', 'root', {
  host: 'host.docker.internal',
  port: 5433,
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
