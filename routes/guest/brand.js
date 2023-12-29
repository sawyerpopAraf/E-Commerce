var express=require('express')
var router=express.Router()
var jsend=require('jsend')
var db=require('../../models')
var BrandService=require('../../services/BrandService')
var brandService=new BrandService(db)

router.use(jsend.middleware)

router.get('/',async(req,res,next)=>{
        // #swagger.tags = ['Guest routes']
        // #swagger.description = "Get all brands" 
        // #swagger.responses = [200]
        try{
            const data = await brandService.getBrands()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})


module.exports=router
