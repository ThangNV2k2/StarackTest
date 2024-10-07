import {createContext, useEffect, useState} from "react";
import {LoginResponse, UserInfo} from "./interface";

interface AuthContextType {
    userInfo: UserInfo | undefined;
    changeUserInfo: (userInfo?: UserInfo, accessToken?: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    userInfo: undefined,
    changeUserInfo: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    const changeUserInfo = (userInfo?: UserInfo, accessToken?: string) => {
        if (accessToken) {
            localStorage.setItem('token', accessToken);
        }
        setUserInfo(userInfo);
    }

    return (
        <AuthContext.Provider value={{ userInfo, changeUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
};
