var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../../middleware/isAuthAdmin.js')
var jsend=require('jsend')
var db=require('../../models/index.js')

var CategoryService=require('../../services/CategoryService')
var categoryService=new CategoryService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/',jsonParser,isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminCategories']
    // #swagger.description = "Gets the list of all available categories for Admin."
    // #swagger.produces = ['text/html']
    // #swagger.responses = [200]
  try{
    const categories = await categoryService.getCategories()
    res.render('categories',{categories:categories})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

router.post('/addcategory', jsonParser, isAuthAdmin, async(req,res,next) => {
      // #swagger.tags = ['AdminCategories']
      // #swagger.description = "Add a category"
      // #swagger.responses = [200]
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
      // #swagger.tags = ['AdminCategories']
      // #swagger.description = "Update a category"
      // #swagger.responses = [200]
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
    // #swagger.tags = ['AdminCategories']
    // #swagger.description = "Delete a category"
    // #swagger.responses = [200]
const {id}=req.params
try{
    const data=await categoryService.deleteCategory(id)
    return res.jsend.success({result:data})
}catch(error){
    res.jsend.error({message: error.message})
}
})

module.exports=router