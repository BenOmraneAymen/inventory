const { Router } = require('express')
const router = Router()
const dotenv = require('dotenv')
const Objet = require('../models/objet')
const Type = require('../models/type')
const checkToken = require('../helpers/authFunctions')
const { Op } = require("sequelize");
const sequelize = require('../database')

dotenv.config()

//creating new objet

router.post('/',async (req,res)=>{
    const {objetName,etat,number,typeId} = req.body
    const similair = await Objet.findOne({where:{objetName}})
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    if(tokenvalidation){
        if(similair){
            res.send('objet already created')
        }
        else{
            Objet.create({"objetName":objetName,"etat":etat,"number":number,"typeId":typeId}).then(()=>{
                res.send('object created')
            }).catch((err)=>{
                console.log(err)
                res.send('an error occured')
            })
        }
    }else{
        res.status(400).json({err:'acess denied'})
    }
})

router.put('/:id',async (req,res)=>{
    const {objetName,etat,number,typeId} = req.body
    const id = req.params.id
    let similair = await Objet.findByPk(id)
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    if(tokenvalidation){
        if(similair){
                similair.set(
                {objetName,etat,number,typeId})
                similair = await similair.save()
                res.send('object updated')
        }else{
            res.send('no item').status(404)
        }
    }else{
        res.status(400).json({err:'access denied'})
    }

})

router.post('/data',async (req,res)=>{
    let type = await req.body.type
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    if(tokenvalidation){
        if(type==='All')
        {
           /* const data = await Objet.findAll()
            console.log(data)
            res.json(data)   */
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM types inner JOIN objets ON types.typeId = objets.typeId"
              );
              console.log(JSON.stringify(results, null, 2))
              res.json(results)
        }
        else{
            const [results, metadata] = await sequelize.query(
                `SELECT * FROM types JOIN objets ON types.typeId = objets.typeId where types.typeName= '${type}' `
              );
              console.log(results)
              res.json(results)
        }
    }else{
        res.status(400).json({err:"access denied"})
    }
})  

router.post('/dataById',async (req,res)=>{
    let id = await req.body.id
    const [results, metadata] = await sequelize.query(
        `SELECT * FROM types JOIN objets ON types.typeId = objets.typeId where objets.objectId=${id} `
      );
      console.log(JSON.stringify(results, null, 2))
      res.json(results)
})  

router.post('/search',async (req,res)=>{
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    let name = await req.body.name
    if(tokenvalidation){
        const data = await Objet.findAll({where:{objetName:{[Op.like]:`${name}%`}}})
        console.log(data)
        res.json(data)
    }else{
        res.status(400).json({err:"accees denied"})
    }
})

router.post('/delete',async (req,res)=>{
    const accessToken = req.headers.authorization
    let tokenvalidation = checkToken(accessToken,process.env.JWT_SECRET_KEY)
    if(tokenvalidation){
        let objetName = await req.body.objetName
        console.log(objetName)
        await Objet.destroy(  {where: {
            objetName:objetName
          }})
    }else{
        res.status(400).json({err:'access denied'})
    }
})

module.exports = router;
