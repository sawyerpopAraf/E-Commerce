module.exports = (sequelize, Sequelize) => {
	const Cart = sequelize.define(
		'Cart',
		{
			checkedOut:{
				type:Sequelize.DataTypes.BOOLEAN,
				allowNull:false
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