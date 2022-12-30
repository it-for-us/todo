import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
