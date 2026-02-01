import AppRouter from "./router/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>

          <AppRouter />

        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
