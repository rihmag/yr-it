const router = require('express').Router();
const Product = require('./productmodel');

// GET all products
router.get('/productsdashboard', async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            return res.status(404).send('No products found');
        }
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

// POST a new product
router.post('/productsdashboard', async (req, res) => {
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !description || !category || !image) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = new Product({ name, price, description, category, image });

    try {
        const product = await newProduct.save();
        res.status(201).json(product);
        console.log('Product created:', product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send('Error creating product');
    }
});

// DELETE a product
router.delete('/productsdashboard/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send('Product deleted successfully');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
});

// PUT (update) a product
router.put('/productsdashboard/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, description, category, image } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, description, category, image },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product');
    }
});

module.exports = router;
