
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../views/HomePage";
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import CartPage from "../views/CartPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
