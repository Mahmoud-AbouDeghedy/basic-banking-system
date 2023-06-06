import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function createData(id, name, email, current_balance) {
	return { id, name, email, current_balance };
}

function Customers() {
	const location = useLocation();
	const { customers } = location.state;
	const rows = customers.map((customer) => {
		return createData(
			customer.id,
			customer.name,
			customer.email,
			customer.current_balance
		);
	});

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">ID</StyledTableCell>
						<StyledTableCell align="center">Name</StyledTableCell>
						<StyledTableCell align="center">Email</StyledTableCell>
						<StyledTableCell align="center">Current_Balance</StyledTableCell>
						<StyledTableCell align="center">View Customer</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.id}>
							<StyledTableCell component="th" scope="row" align="center">
								{row.id}
							</StyledTableCell>
							<StyledTableCell align="center">{row.name}</StyledTableCell>
							<StyledTableCell align="center">{row.email}</StyledTableCell>
							<StyledTableCell align="center">
								{row.current_balance}
							</StyledTableCell>
							<Button style={{ "margin-top": "8px", "margin-left": "40px" }}>
								<Link
									to={`/customers/${row.id}`}
									state={{ customer: row, customers }}
									style={{
										textDecoration: "none",
										color: "white",
										"font-size": "25px",
										textAlign: "center",
										"background-color": "#3f51b5",
										width: "100px",
									}}
								>
									➡️
								</Link>
							</Button>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Customers;
