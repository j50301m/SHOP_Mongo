const {Sequelize,DataTypes,Model} =require('sequelize');

const sequelize= require('../util/database');

class CartItem extends Model{

}

CartItem.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNullL:false,
        primaryKey:true,
    },
    quantity:{type:DataTypes.INTEGER,allowNullL:false}
    },{
        //其他模型參數
        sequelize, //傳遞連接資料庫實例
        modelName:'cartItem' //模型名稱,在魔法關聯方法內使用的名字
});

module.exports=CartItem;