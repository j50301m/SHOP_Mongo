const db =require('../util/database');
//const {v4:uuidv4}=require('uuid');

class Product{

    constructor(title,imgUrl,description,price,id){
        this.title=title;
        this.imgUrl=imgUrl;
        this.description=description;
        this.price=price;
        //this.id= (typeof id!== 'undefined')? id : uuidv4();
    }
    
    save(){
        const title=this.title;
        const description=this.description;
        const price =this.price;
        const imgUrl =this.imgUrl;

        return db.execute(`INSERT INTO products (title,imgUrl,description,price) VALUE (?,?,?,?)`,[
            title,imgUrl,description,price
        ]);

    }
    
    static isFileExist(){

        
    }

    static fetchAll(){
        return db.execute("SELECT * FROM products").then(([rows,fields])=>{
             return rows;
        });
         
    }

    static findById(id,cb){
        return db.execute(`SELECT *FROM products WHERE id=?`,[id]).then(([row,fields])=>{
            console.log(row); //返回的是數組，但我們只要其中的對象
            return row[0];
        });
    }

    static deleteById(id){
        return db.execute(`DELETE FROM products WHERE id= ?`,[id]);
    }
}


module.exports=Product;


