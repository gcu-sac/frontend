export interface UserContextType {
    user: UserType;
    setUser: (user: UserType) => void;
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    profileImage: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}