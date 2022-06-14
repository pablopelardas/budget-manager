const { DataTypes } = require('sequelize');
// sequelize injected in db.js
module.exports = (sequelize) => {
	sequelize.define('operation', {
		concept: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		mount: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
      defaultValue: DataTypes.NOW,
		},
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
	});
};