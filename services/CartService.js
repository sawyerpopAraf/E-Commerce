class CartService{
    constructor(db){
        this.sequelize=db.sequelize
        this.cartItems=db.CartItems
        this.user=db.User
        this.cart=db.Cart
        this.order=db.Order
        this.product=db.Product
        this.OrderDetails=db.OrderDetails
    }
    async checkout(cartId,userId) {
      const transaction = await this.sequelize.transaction();
      console.log("UserID:", userId, "CartID:", cartId);

      try {
          let currentCart = await this.cart.findOne({
              where: { UserId: userId, id: cartId }
          });
  
          console.log("Current Cart:", currentCart);
        
        if (!currentCart) {
            throw new Error("Cart not found or belongs to another user");
        }
        
        if (currentCart.checkedOut) {
            throw new Error("This cart is already checked out");
        }
        
        currentCart.checkedOut = true;
        await currentCart.save({ transaction });
  
          //check the store and update the product quantity after checking out 
          let cartItems = await this.cartItems.findAll({
              where: { CartId: cartId}
          }, { transaction });
  
          for (const cartItem of cartItems) {
              const product = await this.product.findOne({
                  where: { id: cartItem.ProductId }
              }, { transaction });
  
              if (!product || product.quantity < cartItem.quantity) {
                  throw new Error(`Product with ID ${cartItem.ProductId} is out of stock or does not have enough quantity.`);
              }
  
              product.quantity -= cartItem.quantity;
              await product.save({ transaction });
          }
  
          // create an order 
          let currentUser = await this.user.findOne({
              where: { id: userId }
          }, { transaction });
  
          let currentUserMembership = currentUser.memberShip;
          let currentOrder = await this.order.create({
              status: "In Progress",
              memberShip: currentUserMembership,
              totalPrice: currentCart.totalPrice,
              CartId: cartId,
              UserId: userId,
              orderNumber:this.randomNumber(8)

          }, { transaction });


          //update the membership and the totalPurchased 
          let TotalBoughtThisCart = cartItems.reduce((total, item) => total + item.quantity, 0);
          currentUser.totalPurchased += TotalBoughtThisCart;
  
          if (currentUser.totalPurchased >=15 && currentUser.totalPurchased<=30) {
              currentUser.memberShip = 'Silver';
          } else if (currentUser.totalPurchased > 30) {
              currentUser.memberShip = 'Gold';
          }
          await currentUser.save({ transaction });
  
          //create orderDetails 
          let orderDetails = [];
          for (const cartItem of cartItems) {
              let detail = await this.OrderDetails.create({
                  OrderId: currentOrder.id, 
                  ProductId: cartItem.ProductId,
                  Quantity: cartItem.quantity,
              }, { transaction });
              orderDetails.push(detail);
          }
  
          await transaction.commit();
          return { order: currentOrder, orderDetails };
  
      } catch (error) {
          await transaction.rollback();
          throw error;
      }
  }
  
   randomNumber(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}



}

module.exports=CartService