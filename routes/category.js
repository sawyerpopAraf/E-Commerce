var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var CategoryService=require('../services/CategoryService')
var categoryService=new CategoryService(db)
var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()

router.use(jsend.middleware)

router.post('/', jsonParser, isAuthAdmin, async (req, res, next) => {
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

router.get('/',async(req,res,next)=>{
        try{
            const data = await categoryService.getCategories()
            return res.jsend.success({result:data})
        }catch(error){
            res.jsend.error({message: error.message})
        }
})

router.delete('/:id',isAuthAdmin,async(req,res,next)=>{
    const {id}=req.params
    try{
        const data=await categoryService.deleteCategory(id)
        return res.jsend.success({result:data})
    }catch(error){
        res.jsend.error({message: error.message})
    }
})

router.post('/update/:id',jsonParser,isAuthAdmin, async function (req,res){
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



module.exports=router
