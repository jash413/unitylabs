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
    default: 0,
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
orderSchema.pre('save', async function (next) {
  const order = this;
  let totalAmount = 0;

  for (const product of order.products) {
    const productDetails = await mongoose.model('Product').findById(product.product);
    if (productDetails) {
      totalAmount += productDetails.price * product.quantity;
    }
  }

  order.totalAmount = totalAmount;
  next();
});


module.exports = mongoose.model('Order', orderSchema);
