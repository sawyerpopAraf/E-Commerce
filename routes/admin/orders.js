var express=require('express')
var router=express.Router()
var isAuthAdmin=require('../../middleware/isAuthAdmin.js')
var jsend=require('jsend')
var db=require('../../models/index.js')
var OrderService=require('../../services/OrderService')
var orderService=new OrderService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/ordersDetails',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminOrders']
     // #swagger.description = "get all orders and their details, like product name and purchased quantity"
    // #swagger.responses = [200]
  try{
      const data=await orderService.orderDetailsAdmin()
      return res.jsend.success({result:data})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

router.put('/orderstatus/:id',jsonParser,isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminOrders']
     // #swagger.description = "change the status of an order"
    // #swagger.responses = [200]
   const id=parseInt(req.params.id)
   const {newStatus}=req.body
  try{
      const data=await orderService.orderStatus(id,newStatus)
      return res.jsend.success({result:data})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

router.get('/',isAuthAdmin,async(req,res,next)=>{
    // #swagger.tags = ['AdminOrders']
     // #swagger.description = "Get all orders, like status,membership, orderNumber,UserId"
    // #swagger.responses = [200]
  try{
      const orders=await orderService.getOrdersFrontEnd()
      console.log(orders)
      res.render('orders',{orders:orders})
  }catch(error){
      res.jsend.error({message: error.message})
  }
})

module.exports=router