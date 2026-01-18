
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../views/HomePage";
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import CartPage from "../views/CartPage";
import CocinaPage from "../views/CocinaPage";
import CuartoPage from "../views/CuartoPage";
import BanioPage from "../views/BanioPage";
import OficinaPage from "../views/OficinaPage";
import DecoracionPage from "../views/DecoracionPage";
import PagoPage from "../views/PagoPage";
import ConfirmacionPage from "../views/ConfirmacionPage";
import Layout from "../Layout"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/logout" element={<Navigate to="/" replace />} /> */}
          <Route path="/cocina" element={<CocinaPage />} />
          <Route path="/cuarto" element={<CuartoPage />} />
          <Route path="/baño" element={<BanioPage />} />
          <Route path="/oficina" element={<OficinaPage />} />
          <Route path="/decoracion" element={<DecoracionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/pago" element={<PagoPage />} />
          <Route path="/confirmacion" element={<ConfirmacionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
