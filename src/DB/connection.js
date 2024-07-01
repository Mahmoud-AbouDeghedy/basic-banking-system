const mysql = require("mysql");

// const pool = mysql.createPool({
// 	host: "rxh.h.filess.io",
// 	user: "BasicBankingApp_structure",
// 	password: "be8d1af82fa72c6df51f2b18ce008b67c23a1539",
// 	database: "BasicBankingApp_structure",
// 	port: "3307",
// });
const pool = mysql.createPool({
	host: "sql.freedb.tech",
	user: "freedb_Deghedy",
	password: "z@E6enqnmS2vgNj",
	database: "freedb_Basic Banking App",
	port: "3306",
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
