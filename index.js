const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to the database
mongoose.connect("mongodb+srv://jashmistry4444:SVjlOloq4CX6aNVE@cluster0.fran9pm.mongodb.net/unitylabs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to the database!');
  }).catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });  

// Define and use routes
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
// const productRoutes = require('./routes/productRoutes');

app.use(userRoutes);
app.use(sellerRoutes);
// app.use(productRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
