const Router = require('express');
const router = new Router();
const productController = require('../controllers/product.controller');

router.post('/product', productController.createProduct);
router.get('/product', productController.getProducts);
router.patch('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
