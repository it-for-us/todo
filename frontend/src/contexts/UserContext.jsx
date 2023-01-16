import { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState([
    {
      userName: "test",
      email: "test@gmail.com",
      password: "Test.123",
      passwordConfirm: "",
      workSpace: "",
    },
    
  ]);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        isLogin: isLogin,
        setIsLogin: setIsLogin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
