import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function Customer() {
	const [amount, setAmount] = useState(0);
	const [transactionName, setTransactionName] = useState("Humberto Feedham");
	const [showTransaction, setShowTransaction] = useState(false);
	const location = useLocation();
	let { customer, customers } = location.state;
	customers = customers.filter((cust) => cust.id !== customer.id);
	const options = [];
	customers.forEach((customer) => {
		options.push(customer.name);
	});
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(1);
	const [invalidData, setInvalidData] = useState(false);
	const [processedData, setProcessedData] = useState(false);

	useEffect(() => {
		if (invalidData) {
			const timeout = setTimeout(() => {
				setInvalidData(false);
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [invalidData]);

	const open = Boolean(anchorEl);
	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMakeTransaction = (e) => {
		if (isNaN(amount) || amount > customer.current_balance || amount <= 0) {
			setInvalidData(true);
			e.preventDefault();
			return;
		}

		setProcessedData(true);
		setTimeout(() => {
			const currentDate = new Date();
			const formatter = new Intl.DateTimeFormat("en-US", {
				month: "2-digit",
				day: "2-digit",
				year: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			});

			const formattedDateTime = formatter.format(currentDate);

			const data = {
				amount,
				fromName: customer.name,
				toName: transactionName,
				date: formattedDateTime,
			};
			axios
				.post(
					`https://basic-banking-app-zrk9.onrender.com/api/v1/transaction`,
					data
				)
				.then((response) => {
					console.log(response);
					setShowTransaction(false);
					setProcessedData(false);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
			window.location.href = "/";
		}, 2000);
	};

	return (
		<>
			{invalidData && (
				<Alert
					severity="error"
					onClose={() => {
						setInvalidData(false);
					}}
				>
					Invalid Data!
				</Alert>
			)}
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Customer ID: {customer.id}
					</Typography>
					<Typography variant="h5" component="div">
						{customer.name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{customer.email}
					</Typography>
					<Typography variant="body2">
						Current_Balance: {customer.current_balance}
						<br />
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						onClick={() => setShowTransaction((state) => !state)}
					>
						{!showTransaction ? "Make A Transaction" : "Close"}
					</Button>
				</CardActions>
			</Card>
			{showTransaction && (
				<div>
					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "25ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="filled-basic"
							label="Amount"
							variant="filled"
							onChange={(e) => setAmount(e.target.value)}
						/>
					</Box>
					<div>
						<List
							component="nav"
							aria-label="Device settings"
							sx={{ bgcolor: "background.paper" }}
						>
							<ListItem
								button
								id="lock-button"
								aria-haspopup="listbox"
								aria-controls="lock-menu"
								aria-label="when device is locked"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClickListItem}
							>
								<ListItemText
									primary="Select a Customer to make transaction to"
									secondary={options[selectedIndex]}
								/>
							</ListItem>
						</List>
						<Menu
							id="lock-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "lock-button",
								role: "listbox",
							}}
						>
							{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === selectedIndex}
									onClick={(event) => {
										handleMenuItemClick(event, index);
										setTransactionName(option);
									}}
								>
									{option}
								</MenuItem>
							))}
						</Menu>
						<Button
							variant="contained"
							color="success"
							onClick={handleMakeTransaction}
							style={{ position: "absolute", right: "50%" }}
						>
							{processedData ? "Processing..." : "Make Transaction"}
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
