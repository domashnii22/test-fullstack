const sequelize = require('../db');
const Category = require('../models/category.model');

class CategoryController {
  async getCategories(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const categories = await sequelize.query(
        'SELECT * FROM categories LIMIT :limit OFFSET :offset',
        { replacements: { limit, offset } },
      );

      const totalCategories = await sequelize.query(
        'SELECT COUNT (*) FROM categories',
      );
      const totalPages = Math.ceil(totalCategories / limit);

      res.json({
        categories,
        currentPage: page,
        totalPages,
        totalCategories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createCategory(req, res) {
    try {
      const { category_name } = req.body;
      const newCategory = await Category.create({ category_name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await Category.destroy({
        where: { category_id: req.params.id },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.status(200).json({ message: 'Category deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateCategory(req, res) {
    try {
      const { category_name } = req.body;
      const category = await Category.update(
        { category_name },
        {
          where: { category_id: req.params.id },
        },
      );

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.status(200).json({ message: 'Category updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new CategoryController();
