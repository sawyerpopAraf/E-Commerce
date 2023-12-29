var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../../middleware/isAuthAdmin.js')
var jsend=require('jsend')
var db=require('../../models/index.js')
var UserService=require('../../services/UserService')
var userService=new UserService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminUsers']
    // #swagger.description = "Gets the list of all available users for Admin."
    // #swagger.produces = ['text/html']
     // #swagger.responses = [200]
   try{
       const users= await userService.getUsers()
       res.render('users',{users,users})
   }catch(error){
       res.jsend.error({message:error.message})
   }
})

router.put('/role/:id',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminUsers']
    // #swagger.description = "change user's role, Admin to User or vice versa"
     // #swagger.responses = [200]
   const id=parseInt(req.params.id)
  try{
      const data=await userService.changeUserRole(id)
      console.log(data)
      return res.jsend.success({result:data.role})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

router.delete('/:id',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminUsers']
    // #swagger.description = "soft delete a user."
     // #swagger.responses = [200]
   const id=parseInt(req.params.id)
  try{
      const data=await userService.deleteUser(id)
      console.log(data)
      return res.jsend.success({result:"User deleted"})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

router.put('/:id',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminUsers']
    // #swagger.description = "Reactive a user"
     // #swagger.responses = [200]
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