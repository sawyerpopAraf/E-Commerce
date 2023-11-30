class CartService{
    constructor(db){
        this.sequelize=db.sequelize
        this.cartItems=db.CartItems
        this.user=db.User
        this.cart=db.Cart
        this.order=db.Order
    }
   async  checkout(userid){
     let currentCart=await this.cart.findOne({
        where:{UserId:userid,checkedOut:false}
     })
     if(!current){
        throw new Error("This cart is already checked out")
     }else {
        currentCart.checkedOut=true
        await current.save()
     }
     // create an order 
     let currentUser=await this.user.findOne({
        where:{userId:userid}
     })
     let currentUserMembership=currentUser.currentUserMembership
     await this.order.create({
        status:"in progress",
        memberShip:currentUserMembership,
        totalPrice:currentCart.totalPrice,
        CartId:currentCart.id,
        UserId:userid,

     })


     
    



   }





}