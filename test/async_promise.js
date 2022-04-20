//setTimeOut CallBack測試
const getData=callBack=>{
    setTimeout(()=>
    callBack("Done")  //有傳入參數
    ,1000);
};

setTimeout(()=>{
    console.log("Delay1秒");
    getData(text=>{
        console.log(text);
    })
},1000);

getData(()=>console.log("callBack")); //callback是無參數的??
console.log("Hello");

//結論:SetTimeOut 處理方式是把任務加到 Tasks中列隊等待處理，到達指定秒數後 執行CallBack(不論代碼運行到哪，直接回去那一行)
//這點與C#一樣。 意外發現js的delegate中沒有像C#如此嚴謹(Func、Action的概念)，雖然指定callback要入參
//但調用時沒有參數也不會報錯!!!!XD 

console.log("================");


//promise語法 測試
const getData1=()=>{
    const promise =new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Done1");}
        ,1000);
    })
    return promise;
};

function getData2(){
    const promise =new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Done2");}
        ,1000);
    })
    return promise;
}

setTimeout(()=>{
    console.log("promise測試");
    
    getData1().then(text=>{
        console.log(text);
        return getData2(); //返回下一個等待執行的任務
    })
    .then(text2=>{         //用then接續下去
        console.log(text2);
    })
},1000);



