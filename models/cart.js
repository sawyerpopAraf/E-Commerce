module.exports = (sequelize, Sequelize) => {
	const Cart = sequelize.define(
		'Cart',
		{
			checkedOut:{
				type:Sequelize.DataTypes.BOOLEAN,
				allowNull:false
			},
			totalPrice:{
				type:Sequelize.DataTypes.DECIMAL(10,2),
				allowNull:false,
				defaultValue:0.00
    }
		},
		{
			timestamps: true,
		}
	);
	Cart.associate = function (models) {
        Cart.hasMany(models.CartItems,{foreignKey:{allowNull:false}})
        Cart.hasOne(models.Order,{foreignKey:{allowNull:true}})
		Cart.belongsTo(models.User,{foreignKey:{allowNull:false}})

		
	};
	return Cart;
};