class OrderService{
    constructor(db){
        this.sequelize=db.sequelize
        this.order=db.Order
        this.cart=db.Cart
        this.orderDetails=db.OrderDetails
        this.product=db.Product
       }


  async orderStatus(orderid,newStatus){
    const order=await this.order.findOne({where:{id:orderid}})
    if(!order){
        throw new Error("Order does not exist")
    }
    order.status=newStatus
    await order.save()
     
    return order
}

async orderDetailsUsers(userid) {
  const allOrders = await this.order.findAll({
      where: { UserId: userid },
      include: [
          {
              model: this.orderDetails,  
              include: [
                  {
                      model: this.product,
                      attributes: ['name', 'price', 'imageUrl', 'description'] 
                  }
              ],
              attributes: ['Quantity', 'ProductId']
          }
      ]
  });
  return allOrders;
}


  

async orderDetailsAdmin(){
  const allOrders = await this.order.findAll({
    include: [
        {
            model: this.orderDetails,  
            include: [
                {
                    model: this.product,
                    attributes: ['name', 'price', 'imageUrl', 'description'] 
                }
            ],
            attributes: ['Quantity', 'ProductId']
        }
    ]
});
return allOrders;
}


}

module.exports=OrderService