import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./style/font.css";
import "./style/Global.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
