const Catalog = require('../models/catalog');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

// Create a new catalog for a seller with a list of items
const createCatalog = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { items, name } = req.body;

    // Check if a catalog already exists for the seller
    const existingCatalog = await Catalog.findOne({ seller: sellerId });
    if (existingCatalog) {
      return res.status(400).json({ message: 'Seller already has a catalog' });
    }

    const seller = await User.findById(sellerId);
    if (!seller || seller.userType !== 'seller') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const catalog = new Catalog({ seller: sellerId, name });
    for (const item of items) {
      const product = new Product({ name: item.name, price: item.price });
      await product.save();
      catalog.products.push(product);
    }
    await catalog.save();

    res.status(201).json({ message: 'Catalog created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Catalog creation failed' });
  }
};

// Retrieve the list of orders received by a seller
const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Find all orders that belong to the seller
    const orders = await Order.find({ seller: sellerId });
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this seller' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve seller orders' });
  }
};

module.exports = {
  createCatalog,
  getSellerOrders,
};
