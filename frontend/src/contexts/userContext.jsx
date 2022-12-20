import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userData, setUserData] = useState([
    {
      userName: "test",
      email: "test@gmail.com",
      password: "Test.123",
      passwordConfirm: "",
    },
  ]);
  return (
    <UserContext.Provider
      value={{ userData: userData, setUserData: setUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
