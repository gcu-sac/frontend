import { ReactNode, createContext, useState } from "react";
import { UserContextType, UserType } from "./type/user";

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    profileImage: "",
    password: "",
    createdAt: "",
    updatedAt: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


