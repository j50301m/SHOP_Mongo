const express=require('express');
const path =require("path");
const shopController=require("../controllers/shop");
const isAuth=require('../middlewave/is-auth');

const router=express.Router();

router.get('/',shopController.getIndex);

router.get('/product-list',shopController.getProducts);

router.get('/product-detail/:productId',shopController.getProductDetail);

router.get('/cart',isAuth,shopController.getCart);

router.get('/checkout',isAuth,shopController.getCheckout);

router.post('/add-to-cart',isAuth,shopController.postAddToCart);

router.post('/cart-delete-product',isAuth,shopController.postCartDeleteProduct);

router.post('/create-order',isAuth,shopController.postCreateOrder);

module.exports=router;