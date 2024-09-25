const Product = require('./product.model');
const Category = require('./category.model');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { Product, Category };
