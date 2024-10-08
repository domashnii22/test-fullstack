const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/category.controller');

router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getCategories);
router.patch('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;
