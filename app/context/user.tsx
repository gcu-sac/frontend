"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { UserContextType, UserType } from "./type/user";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL_AUTH } from "../links";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    id: "",
    nickname: "",
    email: "",
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [userToken, setUserToken] = useState<string>(
    Cookies.get("userToken") || ""
  );

  useEffect(() => {
    axios.get(`${BASE_URL_AUTH}/`, { withCredentials: true }).then((res) => {
      setUser(res.data);
    });
  }, [userToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
