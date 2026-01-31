import AppRouter from "./router/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <FavoritesProvider>
            <AppRouter />
          </FavoritesProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
