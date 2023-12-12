var express=require('express')
var router=express.Router()
var jsend=require('jsend')
var db=require('../models')
var SearchService=require('../services/SearchService')
var searchService=new SearchService(db)
var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()

router.use(jsend.middleware)

router.post('/product',jsonParser,async(req,res,next)=>{
        // #swagger.tags = ['Guest routes']
        // #swagger.description = "Search by product name" 
        // #swagger.responses = [200]
    const {product} =req.body
    if(product==null){
        return res.jsend.fail({result:"Plz provide product's name"})
    }
    try{
        const data=await searchService.searchByName(product)
        return res.jsend.success({count:data.length,result:data})
    }
    catch(error){
        throw new Error(error)
    }

})

router.post('/brand',jsonParser,async(req,res,next)=>{
        // #swagger.tags = ['Guest routes']
        // #swagger.description = "Search by brand name" 
        // #swagger.responses = [200]
    const {brand} =req.body
    if(brand==null){
        return res.jsend.fail({result:"Plz provide brand's name"})
    }
    try{
        const data=await searchService.searchByBrand(brand)
        return res.jsend.success({count:data.length,result:data,})
    }
    catch(error){
        throw new Error(error)
    }
})

router.post('/category',jsonParser,async(req,res,next)=>{
     // #swagger.tags = ['Guest routes']
        // #swagger.description = "Search by category name" 
        // #swagger.responses = [200]
    const {category} =req.body
    if(category==null){
        return res.jsend.fail({result:"Plz provide category's name"})
    }
    try{
        const data=await searchService.searchByCategory(category)
        return res.jsend.success({count:data.length,result:data,})
    }
    catch(error){
        throw new Error(error)
    }
})


module.exports=router