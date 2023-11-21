module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			firstName: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
            lastName: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
            userName: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
            email: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
			encryptedPassword: {
				type: Sequelize.DataTypes.BLOB,

				allowNull: false,
			},

			salt: {
				type: Sequelize.DataTypes.BLOB,

				allowNull: false,
			},
            address: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
            tlfNumber: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
            memberShip:{
                type:Sequelize.DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
                allowNull:false
            }
		},
		{
			timestamps: false,
		}
	);
	User.associate = function (models) {
		User.hasMany(models.Order, { foreignKey: { allowNull: false } })
		User.hasMany(models.Cart, { foreignKey: { allowNull: false } })
    
        }
	
	return User;
};