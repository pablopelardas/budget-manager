const dotenv =require('dotenv');

dotenv.config();

const config = {
 dbUser: process.env.DB_USER || 'postgres',
 dbPassword: process.env.DB_PASSWORD || '1234',
 dbHost: process.env.DB_HOST || 'localhost',
 dbName: process.env.DB_NAME || 'budgetmanager',
 dbPort: process.env.DB_PORT || '5432',
 production: process.env.NODE_ENV == 'production',
 port: process.env.API_PORT || '3001',
 host: process.env.API_host || 'localhost',
 cors: process.env.CORS || 'localhost:3000',
};

module.exports = config;