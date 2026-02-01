import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {

    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;

  });

  const isLogged = !!token;

  // Mantener token/user sincronizados con localStorage
  useEffect(() => {

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  // GET /me (validate token)

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


  // LOGOUT

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setFavoriteIds(new Set());
  };


  // FAVORITOS

  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  // Traer favoritos del usuario
  const fetchFavorites = async () => {
    if (!token) {
      setFavoriteIds(new Set());
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data = await res.json(); // { productIds: [] }
      setFavoriteIds(new Set((data.productIds || []).map(String)));
    } catch (error) {
      console.log("Error fetchFavorites:", error);
    }
  };

  // Agregar favorito
  const addFavorite = async (productId) => {
    if (!token) return false;

    try {
      const res = await fetch("http://localhost:3000/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const text = await res.text();


      if (!res.ok) return false;

      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.add(String(productId));
        return next;
      });

      return true;
    } catch (error) {
      console.log("Error addFavorite:", error);
      return false;
    }
  };

  // Eliminar favorito
  const removeFavorite = async (productId) => {
    if (!token) return false;

    try {
      const res = await fetch(
        `http://localhost:3000/api/favoritos/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) return false;

      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(String(productId));
        return next;
      });

      return true;
    } catch (error) {
      console.log("Error removeFavorite:", error);
      return false;
    }
  };

  // Cuando cambia el token, refrescar favoritos
  useEffect(() => {
    fetchFavorites();
  }, [token]);



  return (
    <UserContext.Provider
      value={{
        token,
        user,
        isLogged,
        login,
        register,
        logout,
        setUser,
        updateUser,
        favoriteIds,
        fetchFavorites,
        addFavorite,
        removeFavorite,


      }}
    >
      {children}
    </UserContext.Provider>
  );
};
