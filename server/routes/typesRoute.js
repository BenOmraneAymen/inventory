const { Router } = require('express')
const router = Router()
const dotenv = require('dotenv')
const Type = require('../models/type')
const Objet = require('../models/objet')
const checkToken = require('../helpers/authFunctions')

dotenv.config()

// creating new types

router.post('/',async (req,res)=>{
    const {typeName,userId} = req.body
    const similair = await Type.findOne({where:{typeName,userId}})
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    if(tokenvalidation){
        if(similair == null){
            Type.create({"typeName":typeName,"userId":userId}).then(()=>{
                res.send('type created')
            }).catch((err)=>{
                console.log(err)
                res.send('an error occured')
            })
        }
        else{
            res.send('type already created')
        }
    
   }else{
        res.json({
            status:400,
            err:'access denied'
        })
    }

})

router.post('/data',async (req,res)=>{
    const userId = req.body.userId
    const data = await Type.findAll({where:{userId}})
    console.log(data)
    res.json(data)
})

router.put('/:type',async(req,res)=>{   
    try{

        const type = req.params.type
        const typeName = req.body.newtype
        console.log(typeName)
        const userId = req.body.userId
        console.log(type)
        let dataArr = await Type.findAll({where:{'typeName':type,'userId':1}})
        let data = dataArr[0]
        console.log(data)
        if(data){
            data.set({"typeName":typeName})
            data = await data.save()
            res.send('type updated')
        }else{
            res.send('no type found').status(404)
        }
    }catch(err){
        console.log(err)
    }
    })

router.delete('/delete',async (req,res)=>{
    console.log(req)
    let typeName = req.body.typeName
    const data = await Type.findAll({where:{typeName}})
    let typeId = data[0].typeId
    await Objet.destroy(({where:{typeId:typeId}}))
    await Type.destroy({where:{typeName:typeName}})
})

module.exports = router;