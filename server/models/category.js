const { sequelize, DataTypes } = require('sequelize');
const Product = require('./product');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
});

module.exports = Category;
