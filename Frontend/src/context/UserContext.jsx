import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isLogged = !!token;
  const isAdmin = user?.role === "admin";

  // ✅ LOGIN con localStorage
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const found = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return null;

    const fakeToken = `token_${Date.now()}`;
    setToken(fakeToken);
    setUser({ email: found.email, role: found.role });

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify({ email: found.email, role: found.role }));

    return { token: fakeToken, user: { email: found.email, role: found.role } };
  };

  // ✅ REGISTER con localStorage
  const register = (email, password, role = "user") => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = storedUsers.some((u) => u.email === email);
    if (exists) return null;

    const newUser = { email, password, role };
    const updated = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updated));

    // auto-login al registrar
    const fakeToken = `token_${Date.now()}`;
    setToken(fakeToken);
    setUser({ email, role });

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify({ email, role }));

    return { token: fakeToken, user: { email, role } };
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ token, user, isLogged, isAdmin, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
