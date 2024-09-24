const Product = require('../models/product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, date, category } = req.body;
    const newProduct = await Product.create({ name, price, date, category });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.deleteProduct = async (req, res) => {
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
};

module.exports.updateProduct = async (req, res) => {
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
};
