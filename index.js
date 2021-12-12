let express = require('express');
let sqlQuery = require('./mysql');
let app = express();
app.use('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})
app.use(express.json())
app.use(express.urlencoded())

app.post('/checkusername',async(req,res)=>{
    let username =req.body.username
    let strsql = 'select username from 用户表 where username = ?'
    let result = await sqlQuery(strsql,username)
    if(result.length == 0){
        res.send("用户名可以注册")
    }else{
        res.send("已存在该用户名,请重新输入")
    }
})
app.post('/userregistration',async(req,res)=>{
    let user = []
    let hobby = req.body.data.type.toString()
    user.push(req.body.data.name)
    user.push(req.body.data.password)
    user.push(req.body.data.sex)
    user.push(req.body.data.date1)
    user.push(hobby)
    user.push(req.body.data.desc)
    let strsql = 'insert into 用户表 values(?,?,?,?,?,?)';
    let result = await sqlQuery(strsql,user)
    if(result==0){
        res.send("注册失败")
    }else{
        res.send("注册成功")
    }
})
app.post('/userlogin',async(req,res)=>{
    let user = []
    user.push(req.body.data.username)
    user.push(req.body.data.password)
    let strsql = 'select * from 用户表 where username = ? and password=?';
    let result = await sqlQuery(strsql,user)
    if(result==0){
        res.send("用户名或密码错误")
    }else{
        res.send("登录成功")
    }
})


app.listen(8000,()=>{
    console.log("服务器已启动,监听8000端口!")
})