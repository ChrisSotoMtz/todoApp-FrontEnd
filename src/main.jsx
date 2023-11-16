import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
        minH: "100vh",
      },
    }),
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
