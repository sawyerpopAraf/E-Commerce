class CartService{
    constructor(db){
        this.sequelize=db.sequelize
        this.order=db.Order
       
    }


  async adminStatus(orderid,newStatus){
    const order=await this.order.findOne({where:{id:orderid}})
    order.status=newStatus
    await order.save()

  }


}