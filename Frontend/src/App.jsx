import AppRouter from "./router/AppRouter";
import { UserProvider } from "./context/UserContext";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default App;
