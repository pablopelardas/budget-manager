const { DataTypes } = require('sequelize');
// sequelize injected in db.js
module.exports = (sequelize) => {
	sequelize.define('operation', {
		concept: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		amount: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      get(){
        let rawDate = this.getDataValue('date');
        rawDate = typeof rawDate === 'string' && rawDate?.split('-')
        return rawDate ? `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}` : null
      }
    }
	});
};