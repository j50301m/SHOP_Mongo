const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const expressHb=require('express-handlebars');

const errorController=require('./controllers/error');

const adminRoutes=require("./routes/admin");
const shopRoutes=require("./routes/shop");
//----SQL-----
//const sequelize=require('./util/database');
// const Product =require('./models/product');
// const User= require('./models/user');
// const Cart=require('./models/cart');
// const CartItem = require("./models/cart-item");
// const Order=require('./models/order');
// const OrderItem=require('./models/order-item');
//---Mongo---
// const {mongoConnect,getDb}= require('./util/database');
// const User=require('./models/user');
//--Monogoose
const mongoose=require('mongoose');
const User=require('./models/user');

const app =express(); //express 包裝成一個函數

//------導入資源---------------
//---ejs
app.set('view engine','ejs'); //指定模板引擎

//----Handlebars
//let hbs_instance=expressHb.create({partialsDir:['views/partials']});
//app.engine('handlebars',hbs_instance.engine);  //引入引擎，創建變數
//app.set('view engine','handlebars'); //指定模板引擎

//-----pug-------
//app.set('view engine','pug'); //指定模板引擎
app.set('views','views'); //指定views資料夾 默認的views是 process.cwd() + '/views'

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))//靜態資源位置
//-------------------------------------------------------

//--------SQL------------
//帶入測試使用者
// app.use((req,res,next)=>{
//     User.findById(1).then(user=>{
//         req.user=user;
//         next();        
//     }).catch(err=>{
//         console.log(err);
//     });
// });
//-------Mongo-------
// app.use((req,res,next)=>{
    
//     User.findLastUser().then(user=>{
//         req.user=new User(user.name,user.email,user.cart,user._id);
//         //console.log(req.user);
//         next();
//     }).catch(err=>{
//         console.log(err);
//     });
// });
//------mongoose-----
app.use((req,res,next)=>{
    
    User.findOne().then(user=>{
        req.user=user;
        //console.log(req.user);
        next();
    }).catch(err=>{
        console.log(err);
    });
});

app.use(shopRoutes);

app.use('/admin',adminRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/nodejs-shop',{useNewUrlParser:true})
.then(result=>{
    //console.log(result);
    User.findOne().then(user=>{
        if(!user){
            const newUser = new User({
                name:'Jason',
                email:`j50301m@gmail.com`,
                cart:{
                    items:[]
                }
            });
            newUser.save();
        }
    })
}).then(result=>{
    app.listen(3000,()=>{
        console.log("App listening on port 3000");
    });
}).catch(err=>{
    console.log(err);
});

//----Mongo-------cl
// mongoConnect(client=>{
//     //console.log(getDb());
//     User.findLastUser().then(user=>{
//         if(!user){
//             const user =new User('Jason',`j50301m@gmail.com`,{items:[]});
//             user.save();
//         }
        
//     }).then(()=>{
//         app.listen(3000,()=>{
//             console.log('App listening on port 3000');
//         });
//     });

// });




//---------Model-------
//定義模型關聯
// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});

// Order.belongsTo(User);
// User.hasMany(Order);

// Order.belongsToMany(Product,{through:OrderItem});
// Product.belongsToMany(Order,{through:OrderItem});

//同步數據庫
// sequelize.//sync({force:true})
//     sync()
//     .then(result=>{       //同步數據庫
//         return User.findByPk(1);
//     }).then(user=>{  //確認是否有User ,沒有就創建
//         if(!user){
//             return User.save('admin',`j50301m@gmail.com`);
//         }return user;
//     }).then(user=>{     //開始監聽
//         if(user){
//             app.listen(3000,()=>{
//                 console.log('App listening on port 3000');
//             });
//         }
//     }).catch(err=>{console.log(err);})




