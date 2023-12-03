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
        Order.belongsToMany(models.Product, { through: models.OrderDetails, foreignKey: 'OrderId' });
    };

    Order.beforeCreate((order, options) => {
        order.orderNumber = randomNumber(8);
    });

    function randomNumber(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return Order;
};

