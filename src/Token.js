import { jwtDecode } from "jwt-decode";

export const Token = () => {
    try {
        const token = localStorage.getItem("token");
        
        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken = jwtDecode(token);
        return decodedToken; // Возвращаем декодированный токен
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null; // Возвращаем null в случае ошибки
    }
};
