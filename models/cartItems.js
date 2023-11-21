module.exports = (sequelize, Sequelize) => {
	const CartItems = sequelize.define(
		'CartItems',
		{
			quantity: {
				type: Sequelize.DataTypes.INTEGER,

				allowNull: false,
			},
            unitPrice:{
                type:sequelize.DataTypes.DECIMAL,
                allowNull:false
            },
			checkedOut:{
				type:Sequelize.DataTypes.BOOLEAN,
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
        CartItems.belongsTo(models.User,{foreignKey:{allowNull:false}})
		CartItems.hasOne(models.order,{foreignKey:{allowNull:true}})
	};
	return CartItems;
};