
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
import AutencicacioPage from "../views/AutenticacionPage";
import ConfirmacionPage from "../views/ConfirmacionPage";
import FavoritosPage from "../views/FavoritosPage";
import NotFoundPage from "../views/NotFoundPage";
import ProductFormPage from "../views/ProductFormPage";

import Layout from "../Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Routes define todas las rutas accesibles en la aplicación */}
      <Routes>
        {/* Layout envuelve todas las rutas interiores, permitiendo tener Header y Footer fijos */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />


          <Route path="/cocina" element={<CocinaPage />} />
          <Route path="/cuarto" element={<CuartoPage />} />
          <Route path="/baño" element={<BanioPage />} />
          <Route path="/oficina" element={<OficinaPage />} />
          <Route path="/decoracion" element={<DecoracionPage />} />
          <Route path="/decoracion" element={<DecoracionPage />} />

          <Route path="/acceso" element={<AutencicacioPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
          <Route path="/confirmacion" element={<ConfirmacionPage />} />

          {/* Rutas de admin y gestión de productos */}
          <Route path="/productos/crear" element={<ProductFormPage />} />
          <Route path="/productos/editar/:id" element={<ProductFormPage />} />


          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
