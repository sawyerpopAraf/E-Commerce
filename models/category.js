module.exports = (sequelize, Sequelize) => {
	const category = sequelize.define(
		'Category',
		{
			name: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
	category.associate = function (models) {
		category.belongsTo(models.product, { foreignKey: { allowNull: false } })
        
	};
	return category;
};