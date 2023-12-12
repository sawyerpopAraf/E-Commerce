var express=require('express')
var router=express.Router()
var isAuthMember=require('../middleware/isAuthMember')
var isAuthAdmin=require('../middleware/isAuthAdmin')
var jsend=require('jsend')
var db=require('../models')
var CartService=require('../services/CartService.js')
var cartService=new CartService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.post('/checkout/:cartId', jsonParser, isAuthMember, async(req,res,next) => {
       // #swagger.tags = ['User routes']
        // #swagger.description = "check out cart for individual user" 
        // #swagger.responses = [200]
    const cartId = parseInt(req.params.cartId);
    const userId= req.userData.id
    console.log(cartId,userId)
  
    try {
        const data = await cartService.checkout(cartId,userId);
        if (!data) {
            return res.jsend.fail({ result: "No data returned"});
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});

module.exports=router