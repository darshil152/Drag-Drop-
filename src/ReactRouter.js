import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './Admin/Pages/Product';
import Addproduct from './Admin/Pages/Addproduct';
import Banner from './Admin/Pages/Banner';
import Test from './Admin/Pages/Test';
import Coupon from './Admin/Pages/Coupon';
import Settings from './Admin/Pages/Settings';
import Brands from './Admin/Pages/Brands';
import Login from './Admin/Components/Login';
import Register from './Admin/Components/Register';
import Protecteduser from './Admin/Components/Protecteduser';
import ApexChart from './Components/ApexChart';
import Home from './Client/Home';

export default function ReactRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/addproduct/:id" element={<Addproduct />} />

                <Route path="/product/:id" element={<Product />} />
                <Route path="/product" element={<Product />} />

                <Route path="/banner" element={<Banner />} />
                <Route path="/test" element={<Test />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chart" element={<ApexChart />} />


                <Route path="/product/:id" element={
                    <Protecteduser>
                        <Product />
                    </Protecteduser>} />



            </Routes>
        </BrowserRouter>
    )
}
