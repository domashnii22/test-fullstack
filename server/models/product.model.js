const DataTypes = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  product_acceptance_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Product;
