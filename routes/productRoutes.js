const express = require('express');
const { upload } = require("../middleware/upload");
const { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct } = require('../Controllers/productController');
const router = express.Router()



router.post("/new", upload.array("images", 5)  ,createProduct )
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id",upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;    