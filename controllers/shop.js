const Order =require("../models/order");
const Product=require("../models/product");
const user = require("../models/user");
//const Cart =require("../models/cart");

exports.getProducts=(req,res,next)=>{
    Product.find().then(products=>{
        res.render('shop/product-list',{prods:products,
            docTitle:"產品列表",
            //path:'/',
            //hasProducts:products.length > 0,
            activeProductList:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"產品列表",hasBreadcrumbUrl:false},
            ],
           
        });
    });
}

exports.getIndex=(req,res,next)=>{
    Product.find().then(products=>{
        //console.log(products);
        res.render('shop/index',{
            prods:products,
            docTitle:"首頁",
            activeShop:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"首頁",hasBreadcrumbUrl:false},
            ],
            
        });
    }).catch(err=>{
        console.log(err);
    });

    // Product.fetchAll().then(products=>{
    //     res.render('shop/index',{
    //         prods:products,
    //         docTitle:"首頁",
    //         activeShop:true,
    //         breadcrumb:[
    //             {name:"首頁",url:"/",hasBreadcrumbUrl:true},
    //             {name:"首頁",hasBreadcrumbUrl:false},
    //         ],
    //     });
    // });   
}

exports.getCart=(req,res,next)=>{

    req.user
    .populate('cart.items.productId')
    .then(user=>{
        const products =user.cart.items;
        //console.log(products);
        res.render('shop/cart',{
            docTitle:"購物車",
            activeCart:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"購物車",hasBreadcrumbUrl:false},
            ],
            cartProducts:products,
            
            //totalPrice:cart.totalPrice,
        });
    }).catch(err=>console.log(err));
    // console.log(req.user);
    // req.user.getCart()
    // .then(cart=>{
    //     if(!cart){    //如果沒有Cart就創建
    //        return req.user.createCart();
    //     }return cart;
    // }).then(cart=>{
    //     cart.getProducts().then(products=>{
    //         //渲染頁面
    //         res.render('shop/cart',{
    //         docTitle:"購物車",
    //         activeCart:true,
    //         breadcrumb:[
    //             {name:"首頁",url:"/",hasBreadcrumbUrl:true},
    //             {name:"購物車",hasBreadcrumbUrl:false},
    //         ],
    //         cartProducts:products,
    //         //totalPrice:cart.totalPrice,
    //         });
    //     });
    // });

}

exports.postAddToCart=(req,res,next)=>{

    const productId=req.body.productId;
    //console.log(productId);
    Product.findById(productId).then(product=>{
        return req.user.addTocart(product);
    }).then(result=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
    });

    // const productId=req.body.productId;

    // let newQuantity=1;
    // let fetchedCart;
    // req.user
    //     .getCart()
    //     .then(cart=>{
    //         if(!cart){    //如果沒有Cart就創建
    //            return req.user.createCart();
    //         }return cart;
    //     }).then(cart=>{
    //         //console.log(cart);
    //         fetchedCart=cart;
    //         return cart.getProducts({where:{id:productId}});
    //     })
    //     .then(products=>{
    //         //console.log(products);
    //         if(products.length===0){
    //             return Product.findByPk(productId);
    //         }else{
    //             let product=products[0];
    //             newQuantity=product.cartItem.quantity+1;
    //             return product;
    //         }
    //     }).then(product=>{
    //         return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
    //     }).then((result)=>{
    //         //console.log(result);
    //         res.redirect('/cart');
    //     })
    //     .catch(err=>console.log(err));
    
}

exports.getProductDetail=(req,res,next)=>{
    const productId =req.params.productId;
    //console.log(productId);

    Product.findById(productId).then(product=>{
        //console.log(product);
        res.render('shop/product-detail',{
            product:product,
            docTitle:"產品詳情",
            activeProductList:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"產品列表",url:"/product-list",hasBreadcrumbUrl:true},
                {name:"產品詳情",hasBreadcrumbUrl:false}
            ],
            
        });
    })

}

exports.getCheckout=(req,res,next)=>{
    Order.find({'user.userId':req.user._id})
    .populate('items.productId') //把product關聯起來
    .then(orders=>{
        //console.log(orders[0].items);
        res.render('shop/checkout',{
            orders,
            docTitle:"訂單管理",
            activeCheckout:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"訂單管理",hasBreadcrumbUrl:false},
            ],
            
        });
    }).catch(err=>{
        console.log(err);
    })
    // req.user.getOrders().then(orders=>{
    //     console.log(orders);
    //     res.render('shop/checkout',{
    //         orders,
    //         docTitle:"訂單管理",
    //         activeCheckout:true,
    //         breadcrumb:[
    //             {name:"首頁",url:"/",hasBreadcrumbUrl:true},
    //             {name:"訂單管理",hasBreadcrumbUrl:false},
    //         ],
    //     });
    // }).catch(err=>console.log(err));
    // req.user.getOrders({include:['products']}).then(orders=>{
    //     //console.log(orders);
    //     res.render('shop/checkout',{
    //         orders,
    //         docTitle:"訂單管理",
    //         activeCheckout:true,
    //         breadcrumb:[
    //             {name:"首頁",url:"/",hasBreadcrumbUrl:true},
    //             {name:"訂單管理",hasBreadcrumbUrl:false},
    //         ],
    //     });
    // });
}

exports.postCartDeleteProduct=(req,res,next)=>{
    const productId=req.body.productId;
    req.user.deleteCartItem(productId).then(result=>{
        //console.log(result);
        res.redirect('/cart');
    }).catch(err=>console.log(err));

    // const productId=req.body.productId;

    // req.user.getCart().then(cart=>{
    //     return cart.getProducts({where:{id:productId}});
    // }).then(products=>{
    //     const product=products[0];
    //     //console.log(product.cartItem.__proto__);
    //     return product.cartItem.destroy();
    // }).then(result=>{
    //     res.redirect('/cart');
    // }).catch(err=>console.log(err));
}

exports.postCreateOrder=(req,res,next)=>{

    req.user
        .populate('cart.items.productId')
        .then(user=>{
            const products=user.cart.items.map((item)=>{
                return{quantity:item.quantity,productId:item.productId};
            });
            const order =new Order({
                user:{
                    name:req.user.name,
                    userId:req.user._id
                },
                items:products
            });
            return order.save();
        }).then(result=>{
            return req.user.clearCart();
        }).then(result=>{
            res.redirect('/checkout');
        }).catch(err=>console.log(err));

    // req.user.createOrder().then(result=>{
    //     res.redirect('/checkout');
    // }).catch(err=>console.log(err));

    // let fetchProducts;
    // let fetchCart;
    // console.log(req.user);
    // req.user.getCart().then(cart=>{   //獲取購物車
    //     fetchCart=cart;
    //     return cart.getProducts({where:{userId:req.user.id}});    //獲取購物車裡的產品
    // }).then(products=>{
    //     fetchProducts=products;
    //     return req.user.createOrder(); //創建訂單
    // }).then(order=>{
    //     return order.addProducts(   //訂單加入產品
    //         fetchProducts.map(product=>{
    //             product.orderItem={quantity:product.cartItem.quantity};
    //             return product;
    //         })
    //     );
    // }).then((result)=>{     //清空購物車
    //     //console.log(fetchCart.__proto__);
    //     return fetchCart.setProducts(null);
    // }).then(result=>{   //轉跳
    //     res.redirect('/checkout');
    // })
    // .catch(err=>console.log(err));
}