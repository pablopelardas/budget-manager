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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken:{
      type: DataTypes.STRING,
    }
	});
};