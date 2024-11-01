// src/api/userApi.js
import axios from 'axios';

const API_URL = "http://localhost:3000/reader/photo";
const token = localStorage.getItem('token');
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/reader/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
            },
        });
        return response.data; // Возвращаем данные пользователя
    } catch (error) {
        throw new Error("Ошибка при получении данных пользователя");
    }
};
export const editReader = async (userId, data) => {
    try {
        const response = await axios.put(`http://localhost:3000/reader/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
            },
        });
        return response.data; // Возвращаем данные обновленного пользователя
    } catch (error) {
        throw new Error("Ошибка при обновлении данных пользователя");
    }
};

export const uploadPhoto = async (file, userId) => {
    const formData = new FormData();
    formData.append("photo", file);
  
    return await axios.post(`${API_URL}/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  export const deletePhoto = async (userId) => {
    return await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


export const updatePhoto = async (file, userId) => {
    const formData = new FormData();
    formData.append("photo", file);
  
    return await axios.put(`${API_URL}/update/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };


  export const createReaderCard = async (id) => {
    try {
        const response = await axios.post(`http://localhost:3000/reader/card/${id}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob', // Указываем, что ожидаем бинарные данные
        });

        // Создаем URL для blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reader_card.pdf'); // Имя файла
        document.body.appendChild(link);
        link.click(); // Инициируем загрузку
        link.remove(); // Удаляем ссылку после загрузки
    } catch (error) {
        console.error("Ошибка при создании читательского билета:", error);
        return { error: error.response?.data?.message || "Ошибка при создании читательского билета" };
    }
};
