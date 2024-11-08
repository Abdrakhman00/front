// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/signin" replace />; // Перенаправляем на страницу входа, если токена нет
    }

    try {
        const decoded = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
        const userRole = decoded.role; // Предполагается, что роль хранится в `role` внутри токена

        if (isTokenExpired) {
            localStorage.removeItem('token'); // Удаляем токен, если он истек

            // Перенаправляем в зависимости от роли
            if (userRole === 'admin' || userRole === 'employee') {
                return <Navigate to="/auth/system" replace />;
            } else if (userRole === 'reader') {
                return <Navigate to="/signin" replace />;
            }
        }
    } catch (error) {
        localStorage.removeItem('token'); // Удаляем токен, если он некорректен
        return <Navigate to="/signin" replace />;
    }

    return children; // Если токен действителен, отображаем дочерний компонент
}

export default ProtectedRoute;
