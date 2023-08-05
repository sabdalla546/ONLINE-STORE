const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authControllrt');
const router = express.Router();
router.route('/').post(productController.createProduct)
                 .get(productController.getAllProduct)

router.route('/:id').get(productController.getSingleProduct)
                    .patch(productController.updateProduct)
                    .delete(productController.deleteProduct);
router.put('/wishlist',authController.protect,productController.addToWishList);
router.put('/rating',authController.protect,productController.rating);

module.exports= router;