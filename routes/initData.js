var express = require('express');
var router = express.Router();
var crypto=require('crypto')
var db=require('../models')
var Init =require('../services/dataInit')
var init=new Init(db)

var bodyParser=require('body-parser')
var jsonParser=bodyParser.json()

var router=express.Router()

//remember to include password to the req.body 
router.post('/',jsonParser, async function(req,res){
   try{
    await init.fetchData('http://backend.restapi.co.za/items/products',req,res,crypto)
    res.status(200).send('Success')   }
   catch(err){
    console.log(err)
    res.status(500).send(err,'error')   }

})

module.exports=router