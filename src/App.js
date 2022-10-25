import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import Products from "./Components/Products/Products";
import Carts from "./Components/Carts/Carts";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/carts" element={<Carts />} />
      </Routes>
    </>
  );
}

export default App;
