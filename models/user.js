
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
                allowNull:true,
				
            },
			deleted:{
				type:Sequelize.DataTypes.BOOLEAN,
				allowNull:false,
				defaultValue:false
            },
			totalPurchased:{
				type:Sequelize.DataTypes.INTEGER,
				allowNull:false,
				defaultValue:0
			},
			role:{
			type:Sequelize.DataTypes.ENUM('Admin','User'),
			allowNull:false,
			defaultValue:'User'
		}},
		
		{
			timestamps: false,
		}
	);
	User.associate = function (models) {
		User.hasMany(models.Order)
		User.hasMany(models.Cart)
    
        }
	
	return User;
};