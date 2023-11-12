export interface UserContextType {
  user: UserType;
  setUser: (user: UserType) => void;
}

export interface UserType {
  id: string;
  nickname: string;
  email: string;
}
