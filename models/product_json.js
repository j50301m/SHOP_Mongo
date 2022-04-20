const rootDir = require("../util/path");
const path = require('path');
const fs =require("fs");
const {v4:uuidv4}=require('uuid');

const dirPath=path.join(rootDir,"data");
const filePath=path.join(dirPath,'product.json');

class Product{

    constructor(title,imgUrl,description,price,id){
        this.title=title;
        this.imgUrl=imgUrl;
        this.description=description;
        this.price=price;
        this.id= (typeof id!== 'undefined')? id : uuidv4();
    }
    
    save(){
        this.constructor.findById(this.id,product=>{
            //console.log(typeof product);
            //判斷是否已經有這個產品了
            if(typeof product !==('undefined')){
                getProductsFromFile(products=>{
                    const existsProductIndex =products.findIndex(x=>x.id===product.id);
                    products[existsProductIndex]=this;

                    fs.writeFile(filePath,JSON.stringify(products),err=>{
                        if(err)console.log(err);
                    });

                });
            }else{
                console.log(product);
                getProductsFromFile(products=>{
                    products.push(this);
                    fs.writeFile(filePath,JSON.stringify(products),err=>{
                        if(err)console.log(err);
                    });
                });
            }
        });

    }
    
    static isFileExist(){
        const promise = new Promise((resole,reject)=>{
            checkDir().then(result=>{
                if(result){return checkFile();}
            })
            .then((result)=>{
                resole(true);
            },err=>{
                reject(err);
            })
        });
        return promise;
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id,cb){
        getProductsFromFile(products=>{
            const product=products.find(x=>x.id === id);
            cb(product);
        });
    }

    static deleteById(id){
        getProductsFromFile(products=>{
            const updateProducts=products.filter(x=>x.id!==id);//把備要刪除的產品濾掉

            fs.writeFile(filePath,JSON.stringify(updateProducts),err=>{
                if(err)console.log(err);
            });

        });
    }
}

//獲取產品檔案
function getProductsFromFile(cb){
    Product.isFileExist().then(result=>{
        if(result){
            fs.readFile(filePath,(err,data)=>{
                if(err) cb([]);
                else cb(JSON.parse(data));
            })
        }
    });
}

//確認資料夾是否存在
function checkDir(){
    //console.log("CheckDir");
    const promise =new Promise((resolve,reject)=>{
        if(fs.existsSync(dirPath)){
            resolve(true);
        }
        else{
            fs.mkdir(dirPath,err=>{
                if(!err) resolve(true);
                else reject(err);
            })
        }
    });
    return promise;
}
//確認檔案是否存在
function checkFile(){
    //console.log("CheckFile");
    const promise =new Promise((resolve,reject)=>{
        if(!fs.existsSync(filePath)){
            fs.writeFile(filePath,'[]',(err)=>{
                if(!err)resolve(true);
                else reject(err);
            });
        }
        else{resolve(true);}

    });
    return promise;
}

module.exports=Product;


