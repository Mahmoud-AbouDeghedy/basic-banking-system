const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT || 3306,
});

// Connect to the database
pool.getConnection((error, connection) => {
	if (error) {
		console.error("Failed to connect to the database:", error);
	} else {
		console.log("Connected to the database");
	}
});

module.exports = pool;
