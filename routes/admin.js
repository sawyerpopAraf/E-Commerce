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
var OrderService=require('../services/OrderService')
var orderService=new OrderService(db)
var UserService=require('../services/UserService')
var userService=new UserService(db)


var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/brands',jsonParser,isAuthAdmin,async(req,res,next)=>{
    try{
      const brands = await brandService.getBrands()
      res.render('brands',{brands:brands})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

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

router.put('/updatebrand/:id',isAuthAdmin, async(req,res,next)=>{
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

router.get('/category',jsonParser,isAuthAdmin,async(req,res,next)=>{
    try{
      const categories = await categoryService.getCategories()
      res.render('category',{categories:categories})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/addcategory', jsonParser, isAuthAdmin, async(req,res,next) => {
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

router.put('/updatecategory/:id',jsonParser,isAuthAdmin, async(req,res,next)=>{
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

router.post('/addproduct', jsonParser, isAuthAdmin, async(req,res,next) => {
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

router.get('/products',jsonParser,isAuthAdmin,async(req,res,next)=>{
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
    const {id}=req.params
    try{
        const data=await productService.deleteTest(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})


router.put('/reactiveproduct/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await productService.reactive(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.get('/ordersDetails',isAuthAdmin,async(req,res,next)=>{
    try{
        const data=await orderService.orderDetailsAdmin()
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.put('/orderstatus/:id',jsonParser,isAuthAdmin,async(req,res,next)=>{
     const id=parseInt(req.params.id)
     const {newStatus}=req.body
    try{
        const data=await orderService.orderStatus(id,newStatus)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.get('/orders',isAuthAdmin,async(req,res,next)=>{
    try{
        const orders=await orderService.getOrdersFrontEnd()
        console.log(orders)
        res.render('orders',{orders:orders})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})


router.get('/users',isAuthAdmin,async(req,res,next)=>{
    try{
        const users= await userService.getUsers()
        res.render('users',{users,users})
    }catch(error){
        res.jsend.error({message:error.message})
    }
})

router.put('/role/:id',isAuthAdmin,async(req,res,next)=>{
    const id=parseInt(req.params.id)
   try{
       const data=await userService.changeUserRole(id)
       console.log(data)
       return res.jsend.success({result:data.role})
   }catch(error){
       res.jsend.error({message: error.message})
   }
})

router.delete('/users/:id',isAuthAdmin,async(req,res,next)=>{
    const id=parseInt(req.params.id)
   try{
       const data=await userService.deleteUser(id)
       console.log(data)
       return res.jsend.success({result:"User deleted"})
   }catch(error){
       res.jsend.error({message: error.message})
   }
})

router.put('/users/:id',isAuthAdmin,async(req,res,next)=>{
    const id=parseInt(req.params.id)
   try{
       const data=await userService.reactiveUser(id)
       console.log(data)
       return res.jsend.success({result:"User added back to database"})
   }catch(error){
       res.jsend.error({message: error.message})
   }
})
module.exports=router