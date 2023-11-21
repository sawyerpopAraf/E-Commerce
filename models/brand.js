module.exports = (sequelize, Sequelize) => {
	const brand = sequelize.define(
		'Brand',
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
	brand.associate = function (models) {
		brand.hasMany(models.product, { foreignKey: { allowNull: false } });
	};
	return brand;
};