import {createContext, useContext, useState} from "react";

const AuthContext = createContext();
export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const [simpleUser, setSimpleUser] = useState(() => {
        const savedUser = localStorage.getItem("simpleUser");
        return savedUser ? JSON.parse(savedUser) : {username: "", avatar: "", displayName: ""}
    });

    const login = (data) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("simpleUser", JSON.stringify({
            username: data.username,
            avatar: data.avatar,
            displayName: data.displayName
        }));
        setIsAuthenticated(true);
        setSimpleUser(data);
    }

    const logout = () => {
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("simpleUser");
        setIsAuthenticated(false);
        setSimpleUser({
            username: "",
            avatar: "",
            displayName: ""
        });
    }

    return (
        <AuthContext.Provider value = {{isAuthenticated, simpleUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}