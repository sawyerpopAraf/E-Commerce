var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var BrandService=require('../services/BrandService')
var brandService=new BrandService(db)
var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()

router.use(jsend.middleware)

router.post('/', jsonParser, isAuthAdmin, async (req, res, next) => {
    const { brandname } = req.body;
    if (!brandname) {
        return res.jsend.fail({ result: "Brand name needed" });
    }
    try {
        const data = await brandService.createBrand(brandname);
        if (!data) {
            return res.jsend.fail({ result: "No data returned"});
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});

router.get('/',async(req,res,next)=>{
        try{
            const data = await brandService.getBrands()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})

router.delete('/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await brandService.deleteBrand(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/update/:id',isAuthAdmin, async function (req,res){
    const{newbrand}=req.body
    if(newbrand==null){
        return res.jsend.fail({result:"newbrand name needed"})
    }
    try{
        const data= await brandService.updateBrand(req.params.id,newbrand);
        return res.jsend.success({result:data})    
    } catch(error){
        res.jsend.error({message: error.message})
    }
})



module.exports=router
