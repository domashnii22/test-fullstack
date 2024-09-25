const sequelize = require('../db');
const Product = require('../models/product.model');

class ProductController {
  async getProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const products = await sequelize.query(
        'SELECT * FROM products LIMIT :limit OFFSET :offset',
        { replacements: { limit, offset } },
      );

      const totalProducts = await sequelize.query(
        'SELECT COUNT (*) FROM products',
      );
      const totalPages = Math.ceil(totalProducts / limit);

      res.json({ products, currentPage: page, totalPages, totalProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price, date, category } = req.body;
      const newProduct = await Product.create({ name, price, date, category });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.destroy({
        where: { product_id: req.params.id },
      });

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, price, date, category } = req.body;
      const product = await Product.update(
        { name, price, date, category },
        {
          where: { product_id: req.params.id },
        },
      );

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json({ message: 'Product updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ProductController();
