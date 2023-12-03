module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        checkedOut: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        }
    }, {
        timestamps: true,
    });

    Cart.associate = function(models) {
        Cart.hasMany(models.CartItems);
        Cart.hasOne(models.Order);
        Cart.belongsTo(models.User);
    };

    return Cart;
};

