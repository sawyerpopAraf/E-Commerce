var express = require('express');
var router = express.Router();
var crypto=require('crypto')
var db=require('../models')
var Init =require('../services/dataInit')
var init=new Init(db)
var BrandService=require('../services/BrandService')
var brandService=new BrandService(db)

var bodyParser=require('body-parser')
var jsonParser=bodyParser.json()

var router=express.Router()

router.post('/',jsonParser, async function(req,res){     
        // #swagger.description = "initial database population,This endpoint could only populate the database if there are no records in the database." 
        // #swagger.responses = [200]
    const {password}=req.body
    if (!password) {
        return res.status(400).send('Password is required');
    }
   try{
    const brands=await brandService.getBrands()
    console.log(brands.length)
    if(brands.length===4){
        return res.status(400).send("Database is already populated")
    }
    await init.fetchData('http://backend.restapi.co.za/items/products',req,res,crypto)
    res.status(200).send('Success')   }
   catch(err){
    console.log(err)
    res.status(500).send(err,'error')   }

})

module.exports=router