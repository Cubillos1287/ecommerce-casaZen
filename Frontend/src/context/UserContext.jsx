import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });


  const login = async (email, password) => {
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

  const register = async (email, password, name) => {
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

  const getProfile = async () => {
    // MOCK: Simular petición GET /users/profile
    // Header Authorization: Bearer <token>
    if (!token) return null;
    if (user) return user;
    return null;
  };

  return (
    <UserContext.Provider value={{ token, user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
