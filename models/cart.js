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
        Cart,hasMany(models.CartItems,{foreignkey:{allowNull:false}})
        Cart.hasOne(models.order,{foreignKey:{allowNull:true}})
		Cart.belongsToMany(models.Product, { through:ProductId,foreignKey:{allowNull:false} });
		
	};
	return Cart;
};