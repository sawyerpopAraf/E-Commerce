class CartItemsService{
    constructor(db){
        this.sequelize=db.sequelize
        this.cartItems=db.CartItems
        this.product=db.Product
        this.cart=db.Cart
        this.user=db.User
    }
    
    totalprice(products, memberShip) {
        let currentTotalPrice = 0;
        for (const product of products) {
            const priceUnit = product.quantity * product.unitPrice;
            currentTotalPrice += priceUnit;
        }
    
        switch (memberShip) {
            case 'Silver':
                return currentTotalPrice * 0.85; 
            case 'Gold':
                return currentTotalPrice * 0.70; 
            default:
                return currentTotalPrice; 
        }
    }
    
        
    async createItems(productId, quantity, userId) {
        
        let choosedProduct = await this.product.findOne({ where: { id: productId } });
        if (choosedProduct == null || choosedProduct.quantity == 0) {
            throw new Error("Sorry, this product is currently out of stock");
        }
        
        let [cart, created] = await this.cart.findOrCreate({
            where: { UserId: userId, checkedOut: false },
            defaults: { UserId: userId, checkedOut: false }
        });
        
        let cartItem = await this.cartItems.findOne({
            where: { ProductId: productId, CartId: cart.id }
        });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await this.cartItems.create({
                ProductId: productId,
                quantity: quantity,
                CartId: cart.id,
                unitPrice: choosedProduct.price
            });
        }
        
        // update the cart total price 
        let allCartItems = await this.cartItems.findAll({
            where: { CartId: cart.id },
            
        });
        
        let products = allCartItems.map(item => ({
            quantity: item.quantity,
            unitPrice: item.unitPrice 
        }));
    
        let user = await this.user.findOne({ where: { id: userId } });
        let memberShipStatus = user.memberShip; 
    
        let calculateTotalPrice = this.totalprice(products, memberShipStatus);
        await cart.update({ totalPrice: calculateTotalPrice }, { where: { id: cart.id } });
    
        return {cartItem,calculateTotalPrice};
    }
    
    
    

}

module.exports=CartItemsService