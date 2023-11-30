var express=require('express')
var router=express.Router()
var isAuthMember=require('../middleware/isAuthMember')
var jsend=require('jsend')
var db=require('../models')
var CartItemsService=require('../services/CartItemsService')
var cartItemService=new CartItemsService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.post('/add', jsonParser, isAuthMember, async (req, res, next) => {
    const { productId,quantity} = req.body;
    const userId= req.userData.id
    if (!productId&&!quantity) {
        return res.jsend.fail({ result: "productId and quantity needed" });
    }
    try {
        const data = await cartItemService.createItems(productId,quantity,userId);
        if (!data) {
            return res.jsend.fail({ result: "No data returned"});
        }
        res.jsend.success((data));
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});



module.exports=router