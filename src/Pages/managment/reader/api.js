import axios from 'axios';

const API_URL = 'http://localhost:3000/reader'; // Убедитесь, что URL правильный

// Получите токен из localStorage
const getAuthToken = () => localStorage.getItem('token');

// Функция для создания сотрудника
export const createReader = async (employeeData) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(API_URL, employeeData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Верните ответ от сервера
    } catch (error) {
        console.error("Ошибка при создании сотрудника:", error);
        return { error: error.response?.data?.message || "Ошибка при создании сотрудника" };
    }
};
export const getAllReaders = async () => {
    try {
        const token = getAuthToken(); // Функция для получения токена аутентификации
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Верните ответ от сервера
    } catch (error) {
        console.error("Ошибка при получении сотрудников:", error);
        throw new Error(error.response?.data?.message || "Ошибка при получении сотрудников"); // Бросаем ошибку для обработки в компоненте
    }
};

// Функция для получения сотрудника по ID
export const getReaderById = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Верните ответ от сервера
    } catch (error) {
        console.error("Ошибка при получении сотрудника:", error);
        return { error: error.response?.data?.message || "Ошибка при получении сотрудника" };
    }
};

// Функция для обновления сотрудника
export const updateReader = async (id, employeeData) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`${API_URL}/${id}`, employeeData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Верните ответ от сервера
    } catch (error) {
        console.error("Ошибка при обновлении сотрудника:", error);
        return { error: error.response?.data?.message || "Ошибка при обновлении сотрудника" };
    }
};

// Функция для удаления сотрудника
export const deleteReader = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Верните ответ от сервера
    } catch (error) {
        console.error("Ошибка при удалении сотрудника:", error);
        return { error: error.response?.data?.message || "Ошибка при удалении сотрудника" };
    }
};



