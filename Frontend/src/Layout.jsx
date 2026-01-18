import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import CartPage from "./views/CartPage";
const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <CartPage />
      {/* <Outlet />     */}
      {/* Outlet espacio reservado donde se va a renderizar la página correspondiente a la ruta. */}
      <Footer />

    </div>
  );
};

export default Layout;

