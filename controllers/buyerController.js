const User = require('../models/User');
const Catalog = require('../models/Catalog');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get a list of all sellers
const getListOfSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: 'seller' });

    if (!sellers || sellers.length === 0) {
      return res.status(404).json({ message: 'No sellers found' });
    }

    res.status(200).json({ sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve sellers' });
  }
};

// Get the catalog of a seller by seller_id
const getSellerCatalog = async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const catalog = await Catalog.findOne({ seller: sellerId });

    if (!catalog) {
      return res.status(404).json({ message: 'Seller catalog not found' });
    }

    res.status(200).json({ catalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve seller catalog' });
  }
};

// Send a list of items to create an order for a seller
const createOrder = async (req, res) => {
  try {
    const buyerId = req.user._id; // Assuming you have user authentication middleware in place
    const sellerId = req.params.seller_id;
    const { items } = req.body;

    const seller = await User.findById(sellerId);
    if (!seller || seller.userType !== 'seller') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Calculate the totalAmount for the order based on the selected items
    const totalAmount = items.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const order = new Order({ buyer: buyerId, seller: sellerId, products: items, totalAmount });

    await order.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Order creation failed' });
  }
};

module.exports = {
  getListOfSellers,
  getSellerCatalog,
  createOrder,
};
