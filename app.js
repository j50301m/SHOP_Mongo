const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const expressHb=require('express-handlebars');
const session =require('express-session');
const mongodbStroe=require('connect-mongodb-session')(session);
const  cookieParser  =  require ( 'cookie-parser' );
const csrf=require('csurf');
const flash = require('express-flash-messages')

const errorController=require('./controllers/error');
const adminRoutes=require("./routes/admin");
const shopRoutes=require("./routes/shop");
const authRoutes=require('./routes/auth');
const mongoose=require('mongoose');
const User=require('./models/user');
const MONGODBURI='mongodb://localhost:27017/nodejs-shop';

const app =express(); //express 包裝成一個函數

app.set('view engine','ejs'); //指定模板引擎
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))//靜態資源位置

app.use(cookieParser()); 
const csrfProtection=csrf();
//-----設定存放seeion的地方-------
const store = new mongodbStroe({
    uri: MONGODBURI,
    collection: 'sessions'
  });  
//----設定session------
app.use(
    session({
        secret:'random secret string',
        resave:false,   //每次請求都重新自動延長有效時間
        saveUninitialized:false, //無論有沒有session 每次都會請求都會給一個新的session
        cookie:{
            httpOnly:true,
        },
        store:store  //透過 connect-mongodb-session'的實例，存放session  
    },       
));

app.use(csrfProtection);//----產生token，防止CSRF攻擊----
app.use(flash()); //使用flash模塊

app.use((req,res,next)=>{

    if(!req.session.user){
        return next();
    }
    User.findOne().then(user=>{
        req.user=user;
        //console.log(req.user);
        next();
    }).catch(err=>{
        console.log(err);
    });
});

app.use((req,res,next)=>{
    res.locals.isAuthenicated=req.session.isLoggedIn;
    res.locals.csrfToken=req.csrfToken();
    next();
});

app.use(authRoutes);

app.use(shopRoutes);

app.use('/admin',adminRoutes);

app.use(errorController.get404);

//----連接mongodb------
mongoose.connect(MONGODBURI,{useNewUrlParser:true})
.then(result=>{
    app.listen(3000,()=>{
        console.log("App listening on port 3000");
    });
}).catch(err=>{
    console.log(err);
});



