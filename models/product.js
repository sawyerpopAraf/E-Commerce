module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define(
        'Product',
        {
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DataTypes.DECIMAL,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.Category, { foreignKey: { allowNull: false } });
        Product.belongsTo(models.Brand, { foreignKey: { allowNull: false } });
        Product.belongsToMany(models.Order, { through: orderId, foreignKey: { allowNull: false } });
        Product.hasMany(models.CartItems, { foreignKey: { allowNull: false } });
    };
    return Product;
};
