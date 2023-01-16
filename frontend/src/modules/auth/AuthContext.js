import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(token);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
