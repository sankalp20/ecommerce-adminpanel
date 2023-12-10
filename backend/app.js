const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv/config");

app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

//routes
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/categories');


const productsApi = process.env.PRODUCTS_API_URL;

app.use(`${productsApi}/products`, productsRouter);
app.use(`${productsApi}/categories`, categoriesRouter);


mongoose
  .connect(process.env.DB_CONNECTION_STRING_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
