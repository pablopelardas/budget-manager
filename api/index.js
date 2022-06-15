const app = require('./src/app.js');
const {sequelize} = require('./src/db.js'); 
const config = require("./config.js"); 

// Syncing all the models at once.
sequelize.sync({ force: true }).then(() => {
	app.listen(config.port, () => {
		console.log(`%s listening at ${config.port}`); // eslint-disable-line no-console
	});
});