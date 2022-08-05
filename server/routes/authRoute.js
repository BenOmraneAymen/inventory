const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router()
const dotenv = require('dotenv')
const User = require('../models/user')
const checkToken = require('../helpers/authFunctions')

dotenv.config()


//creating users (optional)

router.post('/users',async(req,res)=>{
    const {username,email,password} = req.body
    const similair = await User.findOne({where:{email}})
    if(similair){
        res.send('user already created')
    }
    else{   
        User.create(req.body).then(()=>{
        res.send('user created')
    })
}
})

//checking and comparing the data sent and the data int the database
router.post('/login', async (req,res)=>{
    try{
        console.log('data',req.body)
        const {email,password} = req.body
        const user = await User.findOne({ where: { email: email } })
        if(user){
            if(user.authenticate(password)){
                console.log('match')
            }
            else{
                console.log('dont match')
                res.json({
                    status:400,
                    sucess:false
                })
            }
        }
        else{
            console.log("user not found")
            res.json({
                status:404,
                sucess:false
            })
        }

        const accessToken = jwt.sign({email},process.env.JWT_SECRET_KEY,{
            expiresIn:"1h"
        })
        const refreshToken = jwt.sign({email},process.env.JWT_SECRET_REFRESHTOKEN_KEY,{
            expiresIn:"1d",
        })

        refreshTokens.push(refreshToken)
        

        res.json({
            status:200,
            sucess:true,
            accessToken,
            refreshToken,
            userId:user.userId
        })
    }catch(err){
        res.json({
            status:400,
            sucess:false
        })
    }
})

router.get("/validation",async (req,res)=>{
    const token =  req.headers.authorization
    console.log(token)
    let result = checkToken(token,process.env.JWT_SECRET_KEY)
    console.log(result)
    res.json({'validation':result})
})

router.post("/userInformation",async(req,res)=>{
    try{
        const userId = req.body.userId
        const user = await User.findByPk(userId)
        res.json({
            username:user.username,
            email:user.email,
            sucess:true,
            status:200
        })
    }catch(err){
        res.json({
            err:err,
            status:400,
            success:false
        })
    }
})

let refreshTokens = [];

router.post("/token",(req,res)=>{
    const refreshToken = req.header("x-auth-token");

    if(!refreshToken){
        res.status(401).json({
            error:"token not found"
        })
    }

    if(!refreshTokens.includes(refreshToken)){
        res.status(400).json({
            error:"worng credential"
        })
    }
    console.log(refreshTokens)

    try {
        const user = jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESHTOKEN_KEY);

        const {email} = user
        const accessToken = jwt.sign({email},process.env.JWT_SECRET_KEY,{
            expiresIn:"10m"
        })
        res.status(200).json(
            accessToken
        )
            
    } catch (err) {
        res.status(403).json(
            {error:"invalid credential"}
        )
    }
})

router.delete("/logout", (req, res) => {
    const refreshToken = req.header("x-auth-token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.json({
        status:200,
        message:'logout'
    });
  });

  module.exports = router;