const express = require("express");
const router = express.Router();
const {getProducts, getProductById, deleteProduct, updateProduct} = require("../controllers/productController");

router.route("/allproducts").get(getProducts);
router.route("/allproducts/:id").get(getProductById);
router.route("/allproducts/:id").get(updateProduct);
router.route("/allproducts/:id").get(deleteProduct);

module.exports = router;