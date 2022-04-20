const rootDir = require("../util/path");
const path = require('path');
const fs =require("fs");
const {v4:uuidv4}=require('uuid');

const dirPath=path.join(rootDir,"data");
const filePath=path.join(dirPath,'cart.json');

//購物車 Json結構
//{"products":[{"id":,"qty":1},{"id":"135e2ed9-6e39-46d1-94fe-24642adfacf0","qty":2}],"totalPrice":1425.9}
class Cart{
  
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

    static addProduct(productId,productPrice){
        getCartFromFile(cart=>{
            //先查詢是否有此產品
            const existsProductIndex =cart.products.findIndex(x=>x.id===productId);
            let updateProduct={}; //要更新的產品

            //如果沒有此產品,就添加此產品
            if(existsProductIndex === -1){
                updateProduct={id:productId,qty:1};
                cart.products.push(updateProduct);
            //如果有就把數量加上去
            }else{
                let existsProduct=cart.products[existsProductIndex];
                updateProduct={...existsProduct};
                updateProduct.qty=existsProduct.qty+1;
                cart.products[existsProductIndex]=updateProduct;
            }

            cart.totalPrice=cart.totalPrice+ +productPrice;
            //寫入檔案
            fs.writeFile(filePath,JSON.stringify(cart),(err)=>{
                if(err) console.log(err);
            })
        });
    }

    static getCart(cb){
        getCartFromFile(cart=>{
            cb(cart);
        });
    }

    static deleteProduct(id,productPrice){
        getCartFromFile(cart=>{
            const updateCart={...cart};
            const product = updateCart.products.find(x=>x.id===id);

            if(!product)return;
 
            updateCart.products=updateCart.products.filter(x=>x.id!== id); //移除產品
            updateCart.totalPrice=updateCart.totalPrice-productPrice*product.qty; //總價扣除刪掉的產品

            fs.writeFile(filePath,JSON.stringify(updateCart),err=>{
                if(err)console.log(err);
            });

        });
    }
}

//獲取購物車檔案
function getCartFromFile(cb){
    Cart.isFileExist().then(result=>{
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
            fs.writeFile(filePath, '{"products":[],"totalPrice":0}' ,(err)=>{
                if(!err)resolve(true);
                else reject(err);
            });
        }
        else{resolve(true);}

    });
    return promise;
}

module.exports=Cart;