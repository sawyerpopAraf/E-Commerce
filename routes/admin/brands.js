var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../../middleware/isAuthAdmin.js')
var jsend=require('jsend')
var db=require('../../models/index.js')
var BrandService=require('../../services/BrandService')
var brandService=new BrandService(db)


var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/',jsonParser,isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminBrands']
    // #swagger.description = "Gets the list of all available brands for Admin."
    // #swagger.produces = ['text/html']
     // #swagger.responses = [200]

   try{
     const brands = await brandService.getBrands()
     res.render('brands',{brands:brands})
   }catch(error){
       res.jsend.error({message: error.message})
   }
})

router.post('/addbrand', jsonParser, isAuthAdmin, async (req, res, next) => {
      // #swagger.tags = ['AdminBrands']
      // #swagger.description = "Add a brand to database"
       // #swagger.responses = [200]
      
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

router.put('/updatebrand/:id',isAuthAdmin, async(req,res,next)=>{
    // #swagger.tags = ['AdminBrands']
    // #swagger.description = "update a brand"
   // #swagger.responses = [200]
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

router.delete('/deletebrand/:id',isAuthAdmin,async(req,res,next)=>{
  // #swagger.tags = ['AdminBrands']
    // #swagger.description = "delete a brand from database"
     // #swagger.responses = [200]
 const {id}=req.params
 try{
     const data=await brandService.deleteBrand(id)
     return res.jsend.success({result:data})
 }catch(error){
     res.jsend.error({message: error.message})
 }
})

module.exports=router