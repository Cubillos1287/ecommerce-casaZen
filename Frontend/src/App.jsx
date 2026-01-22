import AppRouter from "./router/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
