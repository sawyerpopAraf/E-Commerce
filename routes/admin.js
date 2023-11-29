var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var BrandService=require('../services/BrandService')
var brandService=new BrandService(db)
var CategoryService=require('../services/CategoryService')
var categoryService=new CategoryService(db)
var ProductService=require('../services/ProductService')
var productService=new ProductService(db)
var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.post('/addbrand', jsonParser, isAuthAdmin, async (req, res, next) => {
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

router.post('/updatebrand/:id',isAuthAdmin, async function (req,res){
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
    const {id}=req.params
    try{
        const data=await brandService.deleteBrand(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/addcategory', jsonParser, isAuthAdmin, async (req, res, next) => {
    const { categoryname } = req.body;
    if (!categoryname) {
        return res.jsend.fail({ result: "Category name needed" });
    }
    try {
        const data = await categoryService.createCategory(categoryname);
        if (!data) {
            return res.jsend.fail({ result: "No data returned from createCategory" });
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});

router.post('updatecategory/:id',jsonParser,isAuthAdmin, async function (req,res){
    const{newcategory}=req.body
    if(newcategory==null){
        return res.jsend.fail({result:"new category name needed"})
    }
    try{
        const data= await categoryService.updateCategory(req.params.id,newcategory);
        return res.jsend.success({result:data})    
    } catch(error){
        res.jsend.error({message: error.message})
    }
})

router.delete('/category/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await categoryService.deleteCategory(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/addproduct', jsonParser, isAuthAdmin, async (req, res, next) => {
    const { name,price,description,imageUrl,quantity,brandId,categoryId } = req.body;
    if (name==null&&price==null&&description==null&&imageUrl==null&&quantity==null&&brandId==null&&categoryId==null) {
        return res.jsend.fail({ result: "please fill all the required fields" });
    }
    try {
        const data = await productService.addProduct(name,price,description,imageUrl,quantity,brandId,categoryId);
        if (!data) {
            return res.jsend.fail({ result: "No data returned"});
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});

router.post('/updateproduct/:id',jsonParser,isAuthAdmin, async function (req,res){
    const {id}=req.params

    const { name,price,description,imageUrl,quantity,brandId,categoryId } = req.body;    
    if(name==null&&price==null&&description==null&&imageUrl==null&&quantity==null&&brandId==null&&categoryId==null){
        return res.jsend.fail({result:"new category name needed"})
    }
    try{
        const data= await productService.updateProduct(name,price,description,imageUrl,quantity,brandId,categoryId,id);
        return res.jsend.success({result:data})    
    } catch(error){
        res.jsend.error({message: error.message})
    }
})

router.delete('/deleteproduct/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await productService.deleteProduct(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

module.exports=router