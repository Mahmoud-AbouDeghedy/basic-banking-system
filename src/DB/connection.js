const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "rxh.h.filess.io",
	user: "BasicBankingApp_structure",
	password: "be8d1af82fa72c6df51f2b18ce008b67c23a1539",
	database: "BasicBankingApp_structure",
	port: "3307",
});

// Connect to the database
connection.connect((error) => {
	if (error) {
		console.error("Failed to connect to the database:", error);
	} else {
		console.log("Connected to the database");
	}
});

module.exports = connection;
