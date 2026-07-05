import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(storedUser);

    const login = (loginResponse) => {

        localStorage.setItem("user", JSON.stringify(loginResponse));

        setUser(loginResponse);
    };

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}