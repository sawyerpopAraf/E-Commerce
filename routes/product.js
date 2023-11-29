var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var ProductService=require('../services/ProductService')
var productService=new ProductService(db)
var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()

router.use(jsend.middleware)

//add brand ,category check 
router.post('/', jsonParser, isAuthAdmin, async (req, res, next) => {
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

router.get('/',async(req,res,next)=>{
        try{
            const data = await productService.getProducts()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})

router.delete('/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await productService.deleteProduct(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/update/:id',jsonParser,isAuthAdmin, async function (req,res){
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

router.post('/search',jsonParser,async (req,res,next)=>{
    const {name} =req.body
    try{
        const data=await productService.search(name)
        return res.jsend.success({result:data})
    }
    catch(error){
        throw new Error(error)
    }

})


module.exports=router