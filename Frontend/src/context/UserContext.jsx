import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Mantener token/user sincronizados con localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  // Si hay token, traer el usuario real desde /me
  useEffect(() => {
    const getMe = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Si el token no sirve, cerramos sesión
        if (!res.ok) {
          setToken("");
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log("Error /me:", error);
      }
    };

    getMe();
  }, [token]);

  //  LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      console.log("LOGIN status:", res.status);
      console.log("LOGIN response:", data);

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error de Login",
          text: data.message || data.error || "Error al iniciar sesión"
        });
        return null;
      }

      //  Ajusta según lo que nuestro backend devuelva
      setToken(data.token);
      setUser(data.user);

      return data;

    } catch (error) {
      console.log("Error login:", error);
      Swal.fire({
        icon: "error",
        title: "Error de Conexión",
        text: "No se pudo conectar con el servidor. Intenta nuevamente."
      });
      return null;
    }
  };

  // REGISTER
  const register = async (email, password, name = "") => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error de Registro",
          text: data.message || data.error || "Error al registrarse"
        });
        return null;
      }

      setToken(data.token || "");
      setUser(data.user || null);

      return data;
    } catch (error) {
      console.log("Error register:", error);
      Swal.fire({
        icon: "error",
        title: "Error de Conexión",
        text: "No se pudo conectar con el servidor. Intenta nuevamente."
      });
      return null;
    }
  };

  // UPDATE USER
  const updateUser = async (updatedData) => {
    if (!token) return null;
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (res.ok) {
        // Actualizamos el usuario localmente con los datos nuevos
        setUser(data.user);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Error al actualizar perfil"
        });
      }
      return res.ok;
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error de Conexión",
        text: "No se pudo conectar con el servidor. Intenta nuevamente."
      });
      return false;
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isLogged = !!token;

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        isLogged,
        login,
        register,
        logout,
        logout,
        setUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
