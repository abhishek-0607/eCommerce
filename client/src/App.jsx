import "./App.css";

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";

function App() {
  const user = true;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
