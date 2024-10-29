// src/api/authApi.js
import axios from 'axios';

const API_URL_ADMIN = "http://localhost:3000/auth";
const API_URL_WORKER = "http://localhost:3000/auth/employee";
const API_URL_READER = "http://localhost:3000/auth/reader"; // URL для читателя

export const login = async (email, password, role) => {
    const apiUrl = role === 'admin' ? API_URL_ADMIN : role === 'reader' ? API_URL_READER : API_URL_WORKER;

    const userCredential = { email, password };

    try {
        const response = await axios.post(apiUrl, userCredential);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        // Проверяем наличие сообщения об ошибке от сервера
        const errorMessage = error.response?.data?.message || "Ошибка при входе"; // Получаем сообщение из ответа сервера, если оно есть
        throw new Error(errorMessage); // Бросаем ошибку с сообщением
    }
};
