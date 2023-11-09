import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      primary: "#4fb252",
      secondary: "#1a7d62",
      bgcolor: "#e3f0e1",
      deepfir: "#002e0b",
    },
  },
  brand: "#4fb252",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/accounts" element={<Outlet />} />
          <Route path="/payroll" element={<Outlet />} />
          <Route path="/reports" element={<Outlet />} />
          <Route path="/advisor" element={<Outlet />} />
          <Route path="/contacts" element={<Outlet />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
