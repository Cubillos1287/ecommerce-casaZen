import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      {/* Outlet espacio reservado donde se va a renderizar la página correspondiente a la ruta. */}
      <Footer />

    </div>
  );
};

export default Layout;

