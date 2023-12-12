var express=require('express')
var router=express.Router()
var jsend=require('jsend')
var db=require('../models')
var ProductService=require('../services/ProductService')
var productService=new ProductService(db)

router.use(jsend.middleware)

router.get('/',async(req,res,next)=>{
       // #swagger.tags = ['Guest routes']
        // #swagger.description = "Get all products" 
        // #swagger.responses = [200]
        try{
            const data = await productService.getProducts()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})

module.exports=router