const bcrypt =require('bcrypt');
const User=require('../models/user');
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    secure:true,
    auth:{
        user:'j50301m@gmail.com',
        pass:'ghbepdpnlyipnsfw',
    }
});

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        docTitle:"用戶登入",
        breadcrumb:[
            {name:"首頁",url:"/",hasBreadcrumbUrl:true},
            {name:"用戶登入",hasBreadcrumbUrl:false}
        ],
        //errorMessages:req.flash('error'),
    });
}

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email}).then(user=>{
        if(!user){
            req.flash('error','找不到該用戶');
            return res.redirect('/login');
        }
        bcrypt.compare(password,user.password).then(isMatch=>{  //判斷密碼是否正確
           if(isMatch){
                req.session.isLoggedIn=true;
                req.session.user=user;
                return req.session.save(err=>{  //手動保存session ，其實他對自動保存
                    if(err)console.log(err);
                    res.redirect('/');
                });
           }else{
            req.flash('error','用戶密碼錯誤');
               return res.redirect('/login');
           }
        }).catch(err=>{
            console.log(err)
            res.redirect('/login');
        });
    }).catch(err=>{
        console.log(err);
    });

}

exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        if(err)console.log(err);
    });
    res.redirect('/');
}

exports.getSignup=(req,res,next)=>{
    res.render('auth/signup',{
        docTitle:"用戶登入",
        breadcrumb:[
            {name:"首頁",url:"/",hasBreadcrumbUrl:true},
            {name:"用戶註冊",hasBreadcrumbUrl:false}
        ],
        
    });

}

exports.postSignup=(req,res,next)=>{
    const name =req.body.name;
    const email =req.body.email;
    const password =req.body.password;
    const confirmPassword=req.body.confirmPassword;

    User.findOne({email:email}).then(userDoc=>{

        if(userDoc){   //存在此用戶
            req.flash('error','此用戶已經存在');
            res.redirect('/signup');
            return;
        }
        if(password!==confirmPassword){  //2個密碼輸入不一樣
            req.flash('error','請再次確認密碼');
            res.redirect('/signup');
            return;
        }
        return bcrypt.hash(password,11);  //生成hash碼
    }).then(hashedPassword=>{
        //console.log(hashedPassword); 
        if(!hashedPassword) return;
        const user=new User({
            email:email,
            password:hashedPassword,
            name:name,
            cart:{
                items:[]
            },
        });
        transporter.sendMail({
            from:'j50301m@gmail.com',
            to:email,
            subject:'註冊成功',
            html:'<b>歡迎新用戶註冊</b>'
            },(err,info)=>{
                if(err){
                    //console.log(err);
                    req.flash('error','信箱地址錯誤，請確認信箱地址');
                    return res.redirect('/signup');
                }
                if(info){
                    return user.save().then(result=>{
                        req.flash('notify','註冊成功!!，已發送確認mail。請登入!');
                        res.redirect('/login');
                    });
                }
        });
    }).catch(err=>{console.log(err);});
    
}

