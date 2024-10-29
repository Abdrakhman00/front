import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: localStorage.getItem("token") || null, // Убедитесь, что начальное состояние правильно инициализируется
    isFetching: false,
    error: false,
};

/* Creates the AuthContext */
export const AuthContext = createContext(INITIAL_STATE);

/* Provides the context data to all children components */
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        // Сохраняем токен в localStorage, если он существует
        if (state.user) {
            localStorage.setItem("token", state.user);
        } else {
            localStorage.removeItem("token"); // Удаляем токен, если user равен null
        }
    }, [state.user]); // Следим за изменениями в state.user

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
