const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate totalAmount before saving the order
orderSchema.pre('save', function (next) {
  const order = this;
  order.totalAmount = order.products.reduce((total, product) => {
    const productPrice = product.product.price;
    const productQuantity = product.quantity;
    return total + productPrice * productQuantity;
  }, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
