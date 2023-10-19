const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const authMiddleware = require('../middleware/authMiddleware'); // Add authentication middleware

// Create a new catalog for a seller with a list of items
router.post('/api/seller/create-catalog', authMiddleware, sellerController.createCatalog);

// Retrieve the list of orders received by a seller
router.get('/api/seller/orders', authMiddleware, sellerController.getSellerOrders);

module.exports = router;
