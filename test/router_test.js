const fs=require("fs");

function RqListener(req,res){
    const url=req.url; //請求的URL
    const method =req.method; //請求的方法
    //網站第一頁
    if(url==="/")
    {
        res.write(`<html>
        <head><title>Hello~NodeJs</title><meta charset="utf-8"></head>
        <body>
            <h>測試用表單</h1>
            <form method="post" action="/getMessage">
            <input type="text" name="message"/>
            <input type="submit" value="送出">
            </form>
        </body>
        </html>`);
        res.end();
        return;
    }
    console.log(url);
    console.log(method);

    //判定是否成功轉跳 /getMessage 
    if(url==="/getMessage" && method==="POST"){
        const body=[];  
        //監聽stream 並把每個chunk存到數組中
        req.on("data",chunk=>{
            body.push(chunk);
        });
        //監聽是否完成
        return req.on("end",()=>
        {
            const parsedBody=Buffer.concat(body);
            //console.log(parsedBody.toString('utf8')); //為什麼沒有中文QQ
            const message=parsedBody.toString().split("=")[1]; //不要id 只留內容
            //寫入檔案
            fs.writeFile("PostContent",message,err=>{
                if(err)
                {
                    console.log(err);
                    return;
                }
                //return res.end('<script>window.location="/"</script>');//利用js返回首頁
                res.writeHead(302,{location:'/'});
                return res.end();
            }); 



        });
    }

    res.setHeader("Content-Type","text/html;charset=utf-8");
    res.write(`<html>
    <head><title>Hello~NodeJs</title></head>
    <body>
        <h1> 我的第一個NodeJs服務</h1>
    </body>
    </html>`);
    res.end();

}

const message="測試文字123456";
module.exports={RqListener,message};