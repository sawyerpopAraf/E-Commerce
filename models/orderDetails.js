module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define('OrderDetails', {
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    OrderDetails.associate = function(models) {
        OrderDetails.belongsTo(models.Order, { foreignKey: 'OrderId' });
        OrderDetails.belongsTo(models.Product, { foreignKey: 'ProductId' });
    };

    return OrderDetails;
};

