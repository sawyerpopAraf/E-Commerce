var express=require('express')
var router=express.Router()
var isAuthMember=require('../../middleware/isAuthMember')
var jsend=require('jsend')
var db=require('../../models')
var CartItemsService=require('../../services/CartItemsService')
var cartItemService=new CartItemsService(db)

var bodyParser=require('body-parser')

var jsonParser=bodyParser.json()
router.use(jsend.middleware)

router.post('/add', jsonParser, isAuthMember, async(req,res,next) => {
       // #swagger.tags = ['User routes']
        // #swagger.description = "Add item to cart" 
        // #swagger.responses = [200]
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

router.delete('/delete/:itemsId', jsonParser, isAuthMember, async(req,res,next) => {
        // #swagger.tags = ['User routes']
        // #swagger.description = "Delete an item from the cart; the result will depend on whether the cart has been checked out or not" 
        // #swagger.responses = [200]
    const {cartId} = req.body;
    const userId= req.userData.id
    const itemsId=parseInt(req.params.itemsId)
    console.log(cartId,itemsId)
    if (!cartId) {
        return res.jsend.fail({ result: "cartId needed" });
    }
    try {
        await cartItemService.deleteItem(cartId,itemsId,userId);
        
        res.jsend.success({ result: "You have successfully deleted the item" });
    } catch (error) {
        res.jsend.error({message: error.message})
    }
});



module.exports=router