import React, { useState, useEffect } from "react";
import "./styles/transactions.css";

function TransactionsTable() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		// Fetch transactions data from API or database
		// and set it to the state
		const fetchData = async () => {
			const response = await fetch(
				"https://basic-banking-app-zrk9.onrender.com/api/v1/transactions"
			);
			const data = await response.json();
			setTransactions(data);
		};
		fetchData();
	}, []);

	return (
		<div className="transactions-table">
			<h2>Transactions</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Amount</th>
						<th>Date</th>
						<th>From</th>
						<th>To</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td>{transaction.id}</td>
							<td>{transaction.amount}</td>
							<td>{transaction.date}</td>
							<td>{transaction.fromName}</td>
							<td>{transaction.toName}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TransactionsTable;
