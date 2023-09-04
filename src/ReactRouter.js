import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './Admin/Product';
import Addproduct from './Admin/Pages/Addproduct';

export default function ReactRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/addproduct" element={<Addproduct />} />
            </Routes>
        </BrowserRouter>
    )
}
