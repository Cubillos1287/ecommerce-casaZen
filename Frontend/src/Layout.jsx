import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      {/* Outlet espacio reservado donde se va a renderizar la página correspondiente a la ruta. */}
      <Footer />

    </div>
  );
};

export default Layout;

