import "./App.css";
import Home from "./components/Home";
import Customers from "./components/Customers";
import Customer from "./components/Customer";
import Transactions from "./components/Transactions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/customers/:id" element={<Customer />} />
				<Route path="/customers" element={<Customers />}></Route>
				<Route path="transactions" element={<Transactions />} />
				<Route path="/" element={<Home />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
