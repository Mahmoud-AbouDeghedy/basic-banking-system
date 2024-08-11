import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./styles/home.css";
import axios from "axios";

export default function Home() {
	const [customers, setCustomers] = useState([]);

	const fetchData = () => {
		axios
			.get("/api/v1/customers")
			.then((response) => {
				setCustomers(response.data);
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="centered-container">
			<h1>Welcome to the Basic-Banking-App</h1>
			<div className="button-container">
				<Button variant="contained">
					<Link to="/customers" state={{ customers }}>
						Click here to view all Customers
					</Link>
				</Button>
				<Button variant="contained">
					<Link to="/transactions">
						Click here to view the past Transactions
					</Link>
				</Button>
			</div>
		</div>
	);
}
