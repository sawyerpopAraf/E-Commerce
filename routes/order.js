var express=require('express')
var router=express.Router()
var isAuthMember=require('../middleware/isAuthMember')
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var OrderService=require('../services/OrderService')
var orderService=new OrderService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.get('/', jsonParser, isAuthMember, async(req,res,next) => {
    
    const userId= req.userData.id
   
    try {
        const data = await orderService.orderDetailsUsers(userId);
        if (!data) {
            return res.jsend.fail({ result: "No data returned"});
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});

module.exports=router