const mongoose =require('mongoose');
const { Schema } = mongoose;

const productSchema=new Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
    },{
        //versionKey:'vk'  //預設是 __v  ,填入false可以不要此鍵值
});

//暴露模型
module.exports=mongoose.model('Product',productSchema);

// const {getDb}=require('../util/database');
// const mongodb=require('mongodb');

// class Product{
//     constructor(title,imgUrl,price,description,userId){
//         this.title=title;
//         this.imgUrl=imgUrl;
//         this.price=price;
//         this.description=description;
//         this.userId=userId;
//     }

//     save(){
//         const db =getDb();

//         return db.collection('products').insertOne(this).then(result=>{
//             return result;
//         });
//     }

//     static fetchAll(){
//         const db=getDb();

//         return db.collection('products').find().toArray().then(products=>{
//             return products;
//         });
//     }

//     static findById(productId){
//         const db =getDb();
//         return db.collection('products').findOne({_id:new mongodb.ObjectId(productId)}).then(product=>{
//             return product;
//         });
//     }

//     static editById(productId,product){
//         //console.log(product);
//         const db =getDb();
//         return db.collection('products').updateOne({_id:new mongodb.ObjectId(productId)},{$set:product}).then(result=>{
//             return result;
//         });
//     }

//     static deleteById(productId){
//         const db=getDb();
//         return db.collection('products').deleteOne({_id:new mongodb.ObjectId(productId)}).then(result=>{
//             return result;
//         });
//     }
// }

// module.exports=Product;


















// const {Sequelize,DataTypes,Model}=require('sequelize');

// const sequelize= require('../util/database');

// class Product extends Model{
//     static fetchAll(){
//         return this.findAll();
//     }

//     static findById(id){
//         return this.findByPk(id).then(product=>{
//             return product;
//         });
//     }

//     static editById(id,title,imgUrl,price,description){
//         //方法1
//         return this.findByPk(id).then(product=>{
//             product.title=title,
//             product.imgUrl=imgUrl,
//             product.price=price,
//             product.description=description
//             return product.save();
//         });
//         //方法2 update 會返回一個更新條數
//         return this.update({title,imgUrl,description,price},{where:{id:id}});
//     }

//     static deleteById(id){
//         //方法1
//         return this.findByPk(id).then(product=>{
//              return product.destroy();
//         });
//         //方法2
//         return this.destroy({where:{id:id}});
//     }

//     static save(title,imgUrl,description,price,userId){
//         return this.create({title:title,imgUrl:imgUrl,description:description,price:price,userId:userId});
//     }
// }

// //定義表的內容
// Product.init({
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNullL:false,
//         primaryKey:true,
//     },
//     title:{type:DataTypes.STRING,allowNull:false},
//     price:{type:DataTypes.DOUBLE,allowNullL:false},
//     imgUrl:{type:DataTypes.STRING,allowNullL:false},
//     description:{type:DataTypes.STRING,allowNullL:false},
//     },{
//     //其他模型參數
//     sequelize, //傳遞連接資料庫的實例
//     modelName:'product' //模型名稱,在魔法關聯方法內使用的名字
//     });


// // const Product =sequelize.define('Product',{
// //     id:{
// //         type:DataTypes.INTEGER,
// //         autoIncrement:true,
// //         allowNullL:false,
// //         primaryKey:true,

// //     },
// //     title:{type:DataTypes.STRING,allowNull:false},
// //     price:{type:DataTypes.DOUBLE,allowNullL:false},
// //     imgUrl:{type:DataTypes.STRING,allowNullL:false},
// //     description:{type:DataTypes.STRING,allowNullL:false},
// // });

// module.exports=Product;