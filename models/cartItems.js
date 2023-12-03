module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        }
    }, {
        timestamps: true,
    });

    CartItems.associate = function(models) {
        CartItems.belongsTo(models.Product)
        CartItems.belongsTo(models.Cart);
    };

    return CartItems;
};

