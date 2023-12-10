// backend/routes/productRoutes.js

import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    const { barcodeID, productName, category, price, quantity, expiryDate, thresholdValue, wasted } = req.body;
    const newProduct = new Product({
      barcodeID,
      productName,
      category,
      price,
      quantity,
      expiryDate,
      thresholdValue,
      wasted
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get product details by barcode
router.get('/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    const product = await Product.findOne({ barcodeID: barcode });

    if (product) {
      res.json({
        productName: product.productName,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        expiryDate: product.expiryDate,
        thresholdValue: product.thresholdValue,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update product details by barcode
router.put('/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    const { productName, category, price, quantity, expiryDate, thresholdValue } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { barcodeID: barcode },
      {
        productName,
        category,
        price,
        quantity,
        expiryDate,
        thresholdValue,
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json({ message: 'Product updated successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to bulk update product prices
router.put('/updateBulk', async (req, res) => {
  try {
    // Assuming req.body contains an array of objects with barcode and new price
    const updates = req.body;

    // Create an array of promises to update each product in parallel
    const updatePromises = updates.map(async ({ barcode, newPrice }) => {
      return Product.findOneAndUpdate(
        { barcodeID: barcode },
        { $set: { price: newPrice } },
        { new: true, lean: true } // Use lean option for better performance
      );
    });

    const updatedProducts = await Promise.all(updatePromises);

    // Check if all products were successfully updated
    if (updatedProducts.every(product => product)) {
      res.json({ message: 'Prices updated successfully!' });
    } else {
      res.status(404).json({ message: 'One or more products not found' });
    }
  } catch (error) {
    console.error('Error updating prices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new POST route for /api/wasted
router.post('/wasted', async (req, res) => {
  try {
    const { barcodeId, productName, wastedProducts } = req.body;

    // Validate the request body
    if (!barcodeId || !productName || !wastedProducts) {
      return res.status(400).json({ message: 'Invalid request. Please provide all required fields.' });
    }

    // Find the product by barcodeId
    const product = await Product.findOne({ barcodeID: barcodeId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product's wasted field
    product.wasted = wastedProducts;

    // Save the updated product
    await product.save();

    res.status(201).json({ message: 'Wasted products updated successfully!', data: product });
  } catch (error) {
    console.error('Error updating wasted products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
