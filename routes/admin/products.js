var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../../middleware/isAuthAdmin.js')
var jsend=require('jsend')
var db=require('../../models/index.js')
var ProductService=require('../../services/ProductService')
var productService=new ProductService(db)
var CategoryService=require('../../services/CategoryService')
var categoryService=new CategoryService(db)
var BrandService=require('../../services/BrandService')
var brandService=new BrandService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.post('/addproduct', jsonParser, isAuthAdmin, async(req,res,next) => {
    // #swagger.tags = ['AdminProducts']
    // #swagger.description = "Add a product"
    // #swagger.responses = [200]
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

router.get('/',jsonParser,isAuthAdmin,async(req,res,next)=>{
 // #swagger.tags = ['AdminProducts']
  // #swagger.description = "Gets the list of all available products for Admin."
  // #swagger.produces = ['text/html']
  // #swagger.responses = [200]
try{
  const products = await productService.getProducts()
  const brands = await brandService.getBrands()
  const categories = await categoryService.getCategories()
  console.log(products  )
  res.render('products',{products:products,brands:brands,categories:categories})
}catch(error){
    res.jsend.error({message: error.message})
}
})

router.put('/updateproduct/:id',jsonParser,isAuthAdmin, async(req,res,next)=>{
    // #swagger.tags = ['AdminProducts']
    // #swagger.description = "update a product"
    // #swagger.responses = [200]
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

//soft delete product
router.delete('/deleteproduct/:id',isAuthAdmin,async(req,res,next)=>{
   // #swagger.tags = ['AdminProducts']
    // #swagger.description = "delete a product,soft delete"
   // #swagger.responses = [200]
 const {id}=req.params
 try{
     const data=await productService.deleteProduct(id)
     return res.jsend.success({result:data})
 }catch(error){
     res.jsend.error({message: error.message})
 }
})

//only for testing, this will delete the product from the database
router.delete('/deletetest/:id',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['Testing-Product']
     // #swagger.description = "delete a product,only for testing purpose"
    // #swagger.responses = [200]
  const {id}=req.params
  try{
      const data=await productService.deleteTest(id)
      return res.jsend.success({result:data})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})


router.put('/reactiveproduct/:id',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminProducts']
     // #swagger.description = "reactive a product"
    // #swagger.responses = [200]
  const {id}=req.params
  try{
      const data=await productService.reactive(id)
      return res.jsend.success({result:data})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

module.exports=router