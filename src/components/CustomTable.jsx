import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(account, month, ytd) {
  return { account, month, ytd };
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

const rows = [
  createData("Sales", 1194.58, 11418.29),
  createData("Advertising", 6879.02, 9271.36),
  createData("Inventory", 4692.26, 9768.09),
  createData("Entertainment", 0.0, 0.0),
  createData("Product", 4652.1, 2529.9),
];

export default function CustomTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "td, th": { border: 0, color: "gray" } }}>
            <TableCell>Account</TableCell>
            <TableCell align="right">This Month</TableCell>
            <TableCell align="right">YTD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.account} sx={{ "td, th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.account}
              </TableCell>
              <TableCell align="right">{formatCurrency(row.month)}</TableCell>
              <TableCell align="right">{formatCurrency(row.ytd)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
