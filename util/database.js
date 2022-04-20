




//--------SQL-----------------

// const {Sequelize} =require('sequelize');

// const sequelize=new Sequelize('nodejs-shop','root','2swx3dec',{dialect:'mysql',host:'localHost',timezone:'+08:00'});

// module.exports=sequelize;


//-------mongoDB---------------------
// const mongodb =require('mongodb');

// const mongoClient=mongodb.MongoClient;

// let _db;

// const mongoConnect=(cb)=>{
//     mongoClient.connect('mongodb://localhost:27017/nodejs-shop').then(client=>{
//         _db=client.db();
//         cb(client);
//     }).catch(err=>{console.log(err);});
// }

// const getDb=()=>{
//     if(_db){
//         return _db;
//     }
//     throw '沒有對應的數據庫';
// }

// module.exports= {mongoConnect,getDb};