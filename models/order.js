module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        status: {
            type: DataTypes.ENUM('In Progress', 'Ordered', 'Completed'),
            allowNull: false,
        },
        memberShip: {
            type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2)
        }
    }, {
        timestamps: true,
    });

    Order.associate = function(models) {
        Order.belongsTo(models.User);
        Order.belongsTo(models.Cart);
        Order.hasMany(models.OrderDetails)
    };
    return Order;
};

