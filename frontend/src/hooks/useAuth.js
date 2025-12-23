import { useState, useEffect } from "react";
import { authApi } from "./services/api/authApi";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.getMe();
      setUser(data.user);
    } catch (err) {
      console.error("Erro ao verificar autenticação:", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setError(null);
      const data = await authApi.register(email, password, name);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authApi.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async (googleData) => {
    try {
      setError(null);
      const data = await authApi.loginWithGoogle(googleData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
  };
};
