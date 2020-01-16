require('dotenv').config();

module.exports={
    JWT_SECRET: process.env.JWT_SEC,
    DB_URI: process.env.DB_URI
}