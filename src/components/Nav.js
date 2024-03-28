import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import DataLoading from "./data-loading/DataLoading";
import DataVisualization from "./data-visualization/DataVisualization";
import Home from "./home/Home";

function Nav() {
    return (
        <div className="nav-main">
            <BrowserRouter>
                <nav>
                    <NavLink to="/">Home</NavLink>|
                    <NavLink to="upload-csv">Data Loading Screen</NavLink>|
                    <NavLink to="data-visualization">Data Visualization Screen</NavLink>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="upload-csv" element={<DataLoading />} />
                    <Route path="data-visualization" element={<DataVisualization />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
  }
  
export default Nav;