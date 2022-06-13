const { DataTypes } = require('sequelize');
// sequelize injected in db.js
module.exports = (sequelize) => {
	sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		balance: {
			type: DataTypes.STRING,
			allowNull: false,
      defaultValue: 0,
		},
	});
};