module.exports = (sequelize, Sequelize) => {
	const Brand = sequelize.define(
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
	Brand.associate = function (models) {
		Brand.hasMany(models.Product, { foreignKey: { name:'brandId',allowNull: false } });
	};
	return Brand;
};