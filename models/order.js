	module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define(
		'Order',
		{
			status: {
                type:Sequelize.DataTypes.ENUM('In Progress', 'Ordered', 'Completed'),

				allowNull: false,
			},
			memberShip:{
                type:Sequelize.DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
                allowNull:false
            },
			orderNumber:{
				type:Sequelize.DataTypes.STRING,
				allowNull:false
			},
			totalPrice:{
				type:Sequelize.DataTypes.DECIMAL(10,2)
			}
           
		},
		{
			timestamps: true,
		}
	);
	Order.associate = function (models) {
		Order.belongsToMany(models.Product, { through:'OrderDetails',foreignKey:'orderId'});
        Order.belongsTo(models.User,{foreignKey:{allowNull:false}})
		Order.belongsTo(models.Cart,{foreignKey:{allowNull:false}})
	};

	Order.beforeCreate((Order, options) => {
        Order.orderNumber = randomNumber(8);
    });
	return Order;
};

function randomNumber(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
