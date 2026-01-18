import { createContext, useState } from "react";

// 1. Crear el Contexto
// UserContext es el "almacén" que compartirá los datos con todos los componentes
export const UserContext = createContext();

// 2. Crear el Provider
// UserProvider es el componente que "envuelve" la aplicación para proveer los datos
export const UserProvider = ({ children }) => {
  // Estado para guardar el token de autenticación (string) y el usuario (objeto)
  // Se inicializan leyendo localStorage para persistir la sesión al recargar
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const isLogged = !!token;
  const isAdmin = user?.role === "admin";

  const login = async (email) => {
    // MOCK: Simular petición POST /users/login
    console.log("Mock POST /users/login con:", email);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Contract: Response 200 { "token": "String" }
    // En el mock, asumimos que obtenemos el usuario también o lo sacamos del token decodificado ficticiamente
    const mockToken = "mock-token-xyz-123";

    // Simulating fetching profile immediately after login to have user data context
    const mockUser = {
      id: "user-123",
      email: email,
      name: "Henzo Terrez",
      role: "user",
      foto: "/user.png"
    };

    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true, user: mockUser, token: mockToken };
  };

  const register = async (email, name) => {
    // MOCK: Simular petición POST /users/register
    console.log("Mock POST /users/register con:", email, name);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Contract: Response 201 { "id":..., "name":..., "email":... }
    const mockUser = {
      id: "user-new-456",
      email: email,
      name: name || "Nuevo Usuario",
      role: "user",
      foto: "/user.png"
    };
    const mockToken = "mock-token-abc-789"; // Usually register auto-logins

    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true, user: mockUser, token: mockToken };
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    // 3. Retornar el Context Provider con los valores que queremos compartir
    // Value incluye estados (token, user) y funciones (login, register, logout)
    <UserContext.Provider
      value={{ token, user, isLogged, isAdmin, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
