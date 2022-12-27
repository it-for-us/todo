import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
