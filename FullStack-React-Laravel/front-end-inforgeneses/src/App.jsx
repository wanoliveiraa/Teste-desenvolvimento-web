import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './views/Login';
import Signup from './views/Signup';
import Product from './views/Product';
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/UserFrom";

const App = () => {
  return (
 
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/product" />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/new" element={<UserForm key={"userCreate"} />} />
          <Route path="/product/:id" element={<UserForm key={"userUpdate"} />} />
        </Route>
        <Route path="/" element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
   
  );
};

export default App;
