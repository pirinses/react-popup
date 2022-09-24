import React from "react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import AddItem from "./components/AddItem";
import GridList from "./components/GridList";
import "./styles/index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<React.StrictMode>{<App />}</React.StrictMode>);

export { GridList, AddItem };
