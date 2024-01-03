
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// @desc create a product
// @route post  /api/products/
// @access private/Admin

// const createProduct = asyncHandler(async (req, res) => {
//     const{name,price,image,brand,category,countInStock,numReview,description} = req.body;
//     console.log(req.body);
   
//     const product = new Product({
//       //if submit the value then hit this 
//         name, 
//         price,
//         user: user._id,
//         image,
//         brand,
//         category,
//         countInStock,
//         numReview,
//         description,
//       });
  
//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   });


// @desc fetch all products
// @route get /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
  
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});


// @desc fetch single products
// @route get /products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});


// @desc Delete a product
// @route Delete /api/pruducts/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
   const removeproductbyId = await product.remove();
   console.log(removeproductbyId)
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});



// @desc updateProduct
// @route put  /api/products/:id
// @access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


  module.exports = {getProducts, getProductById, deleteProduct, updateProduct}