import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App";

// Define your custom font

// Create a custom theme with the font
const theme = createTheme({
  typography: {
    fontFamily: "'Baloo Chettan 2'",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
