import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const id = sessionStorage.getItem("user_id");
    if (token && id) setUser({ id });
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
  if (loading) {
    return <div>Loading... </div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
