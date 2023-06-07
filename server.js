const express = require("express");
const pool = require("./src/DB/connection");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/v1/customers", (req, res) => {
	const query = "SELECT * FROM Customers";

	pool.getConnection((error, connection) => {
		if (error) {
			console.error("Failed to connect to the database:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
		connection.query(query, (error, results) => {
			if (error) {
				console.error("Error executing the query:", error);
				res.status(500).json({ error: "Internal Server Error" });
			} else {
				res.json(results);
			}
			connection.release();
		});
	});
});

app.post("/api/v1/transaction", (req, res) => {
	const { amount, fromName, toName, date } = req.body;

	const query1 = `UPDATE Customers SET current_balance = current_balance + '${amount}' WHERE name = '${toName}'`;
	const query2 = `UPDATE Customers SET current_balance = current_balance - '${amount}' WHERE name = '${fromName}'`;
	const query3 = `INSERT INTO Transactions (amount, fromName, toName, date) VALUES ( '${amount}', '${fromName}', '${toName}', '${date}')`;

	const queries = [query1, query2, query3];

	Promise.all(
		queries.map((query) => {
			return new Promise((resolve, reject) => {
				pool.getConnection((error, connection) => {
					if (error) {
						console.error("Failed to connect to the database:", error);
						reject({ error: "Internal Server Error" });
					}
					connection.query(query, (error, results) => {
						connection.release(); // Release the connection back to the pool
						if (error) {
							reject(error);
						} else {
							resolve(results);
						}
					});
				});
			});
		})
	)
		.then((results) => {
			res.json(results); // Return the resolved results as JSON
		})
		.catch((error) => {
			console.error("Error executing the queries:", error);
			res.status(500).json({ error: "Internal Server Error" });
		});
});

app.get("/api/v1/transactions", (req, res) => {
	const query = "SELECT * FROM Transactions";

	pool.getConnection((error, connection) => {
		if (error) {
			console.error("Failed to connect to the database:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
		connection.query(query, (error, results) => {
			if (error) {
				console.error("Error executing the query:", error);
				res.status(500).json({ error: "Internal Server Error" });
			} else {
				res.json(results);
			}
			connection.release();
		});
	});
});

app.listen(4000, () => {
	console.log("Server listening on port 4000");
});
