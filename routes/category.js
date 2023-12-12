var express=require('express')
var router=express.Router()
var jsend=require('jsend')
var db=require('../models')
var CategoryService=require('../services/CategoryService')
var categoryService=new CategoryService(db)

router.use(jsend.middleware)

router.get('/',async(req,res,next)=>{
       // #swagger.tags = ['Guest routes']
        // #swagger.description = "Get all categories" 
        // #swagger.responses = [200]
        try{
            const data = await categoryService.getCategories()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})

module.exports=router
