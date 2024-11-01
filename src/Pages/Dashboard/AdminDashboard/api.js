import axios from 'axios';

const API_URL = "http://localhost:3000/employee";

export const createEmployee = async (employeeData, token) => {
    try {
        const response = await axios.post(API_URL, employeeData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        // Обработка ошибок: выводим ошибку в консоль и выбрасываем её
        console.error("Не удалось создать сотрудника:", error);
        
        // Возвращаем информацию об ошибке для дальнейшей обработки
        if (error.response && error.response.data) {
            return { error: error.response.data.message };
        } else {
            return { error: "Неизвестная ошибка" };
        }
    }
};
