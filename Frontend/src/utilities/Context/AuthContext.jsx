import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setuserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchuserIdData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchuserIdData = async () => {
    try {
      const res = await fetch("/api/auth/userId", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setuserId(data.userId);
      } else {
        setToken("");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken, userIdData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setuserId(userIdData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setuserId(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ userId, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
