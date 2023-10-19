const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware');
 
// Get a list of all sellers
router.get('/api/buyer/list-of-sellers', authMiddleware, buyerController.getListOfSellers);

// Get the catalog of a seller by seller_id
router.get('/api/buyer/seller-catalog/:seller_id', authMiddleware, buyerController.getSellerCatalog);

// Send a list of items to create an order for a seller
router.post('/api/buyer/create-order/:seller_id', authMiddleware, buyerController.createOrder);

module.exports = router;
