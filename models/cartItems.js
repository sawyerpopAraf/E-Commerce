module.exports = (sequelize, Sequelize) => {
	const CartItems = sequelize.define(
		'CartItems',
		{
			quantity: {
				type: Sequelize.DataTypes.INTEGER,

				allowNull: false,
			},
            unitPrice:{
                type:Sequelize.DataTypes.DECIMAL,
                allowNull:false
            },
			
			deleted:{
				type:Sequelize.DataTypes.BOOLEAN,
                allowNull:true
			}
		},
		{
			timestamps: true,
		}
	);
	CartItems.associate = function (models) {
		CartItems.belongsTo(models.Product, {foreignKey:{allowNull:false} });
		CartItems.belongsTo(models.Cart, {foreignKey:{allowNull:false} });

	};
	return CartItems;
};