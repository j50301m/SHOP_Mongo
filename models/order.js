const mongoose =require('mongoose');
const { Schema } = mongoose;

const orderSchema= new Schema({
    items:[{
        productId:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
        quantity:{type:Number,required:true},
    }],
    user:{
        name:{type:String,required:true},
        userId:{type:Schema.Types.ObjectId,required:true,ref:'User'}
    }
    },{
        //versionKey:'vk'  //預設是 __v  ,填入false可以不要此鍵值
});

//暴露模型
module.exports=mongoose.model('Order',orderSchema);

// const {Sequelize,DataTypes,Model} =require('sequelize');

// const sequelize= require('../util/database');

// class Order extends Model{}

// Order.init({
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNullL:false,
//         primaryKey:true,
//     }},{
//     //其他模型參數
//     sequelize, //傳遞連接資料庫的實例
//     modelName:'order' //模型名稱,在魔法關聯方法內使用的名字
// });

// module.exports=Order;