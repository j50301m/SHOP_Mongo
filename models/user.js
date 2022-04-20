const mongoose =require('mongoose');
const { Schema } = mongoose;

const userSchema =new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    cart:{
        items:[
            {
                productId:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
                quantity:{type:Number,required:true}
            },
        ]
    },
});

userSchema.methods.addTocart=function(product){
    //console.log(product._id);
    //查找到購物車項目中當前產品的Index
    const cartProductIndex=this.cart.items.findIndex(x=>x.productId.toString()===product._id.toString());
    //設置初始數量
    let newQuantity=1;
    //淺拷貝，更新用
    const updatedCartItems=[...this.cart.items];

    //如果購買的商品沒有存在購物車內
    if(cartProductIndex===-1){
        //添加新產品
        updatedCartItems.push({
            productId:product._id,
            quantity:newQuantity,
        });
    }else{
        //已經存在購物車內
        newQuantity=this.cart.items[cartProductIndex].quantity+1;
        updatedCartItems[cartProductIndex].quantity=newQuantity;
    }

    const updateedCart={
        items:updatedCartItems,
    }
    //更新購物車
    this.cart=updateedCart;
    return this.save();
    //return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:updateedCart}});

    
}

userSchema.methods.deleteCartItem=function(productId){
    console.log(productId);
    const updateedCartItem=this.cart.items.filter(x=>x._id.toString()!==productId.toString());
    this.cart.items=updateedCartItem;
    //console.log(updateedCartItem);
    return this.save();
}

userSchema.methods.clearCart=function(){
    this.cart={items:[]};
    return this.save();
}



module.exports=mongoose.model('User',userSchema);

// // const {getDb}=require('../util/database');
// const mongodb=require('mongodb');
// const ObjectId =mongodb.ObjectId;

// class User{
//     constructor(name,email,cart,id){
//         this.name=name;
//         this.email=email;
//         this.cart=cart;
//         this._id= id;
//     }
//     save(){
//         const db=getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addTocart(product){
//         const db=getDb();
//         //console.log(product._id);
//         //查找到購物車項目中當前產品的Index
//         const cartProductIndex=this.cart.items.findIndex(x=>x.productId.toString()===product._id.toString());
//         //設置初始數量
//         let newQuantity=1;
//         //淺拷貝，更新用
//         const updatedCartItems=[...this.cart.items];

//         //如果購買的商品沒有存在購物車內
//         if(cartProductIndex===-1){
//             //添加新產品
//             updatedCartItems.push({
//                 productId:new ObjectId(product._id),
//                 quantity:newQuantity,
//             });
//         }else{
//             //已經存在購物車內
//             newQuantity=this.cart.items[cartProductIndex].quantity+1;
//             updatedCartItems[cartProductIndex].quantity=newQuantity;
//         }

//         const updateedCart={
//             items:updatedCartItems,
//         }
//         //更新購物車
//         return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:updateedCart}});

//     }
     
//     getCart(){
//         const db=getDb();

//         //從用戶中獲取所有產品編號
//         const productIds=this.cart.items.map(x=>x.productId);

//         return db.collection('products').find({_id:{$in:productIds}}).toArray().then(products=>{  //取得所有db 符合購物車的產品內容
//             return products.map(product=>{       //把每個產品內容 合併購物車的產品數量
//                 const quantity=this.cart.items.find(item=>item.productId.toString()===product._id.toString()).quantity;
//                 return{...product,quantity}; 
//             });
//         });

//     }

//     createOrder(){
//         const db=getDb();
//         return this.getCart().then(products=>{
//             const order= {
//                 items:products,
//                 user:{
//                     _id:new ObjectId(this._id),
//                     name:this.name,
//                 },
//             };
//             return db.collection('orders').insertOne(order);
//         }).then(result=>{  //把user購物車裡面的items清除
//             return db.collection('users').updateOne({_id:new ObjectID(this._id)},{$set:{cart:{items:[]}}});
//         });
//     }

//     getOrders(){
//         const db=getDb();
//         return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray().then(orders=>{
//             console.log(orders);
//              const neworders=orders.map(order=>{
//                  return {
//                      _id:order._id,
//                      items:order.items,
//                  } 
//             });
//             return neworders
//         });
//     }
//     deleteCartItem(productId){
//         const db =getDb();
//         const updateedCartItem=this.cart.items.filter(x=>x.productId.toString()!==productId.toString());
        
//         return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updateedCartItem}}});
//     }
//     static findById(userId){
//         const db=getDb();
//         return db.collection('users').findOneById({_id:new ObjectId(userId)});
//     }

//     static findLastUser(){
//         const db =getDb();

//         return db.collection('users').find().limit(1).toArray().then(users=>{
//             return users[0];
//         });
//     }



// }
// module.exports=User;


// const {Sequelize,DataTypes,Model} =require('sequelize');

// const sequelize= require('../util/database');

// class User extends Model{
//     static save(name,email){
//         return this.create({name:name,email:email});
//     }
//     static findById(id){
//         return this.findByPk(id);
//     }

// }

// User.init({
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNullL:false,
//         primaryKey:true,
//     },
//     name:{type:DataTypes.STRING,allowNull:false},
//     email:{type:DataTypes.STRING,allowNullL:false},
//     },{
//     //其他模型參數
//     sequelize, //傳遞連接資料庫的實例
//     modelName:'user' //模型名稱,在魔法關聯方法內使用的名字
// });

// module.exports=User;
