// auth icin context

import { createContext, useContext } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {

  return (
    <AuthContext.Provider
      value={{
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};