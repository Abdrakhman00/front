import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEmployeeById } from '../../../managment/employee/api';
import { jwtDecode } from 'jwt-decode';
const ProfilePage = () => {
    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        role: 'employee',
        access: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError('Токен не найден');
            setLoading(false);
            return;
        }

        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
        } catch (error) {
            setError('Ошибка при декодировании токена');
            setLoading(false);
            return;
        }

        const fetchEmployeeData = async () => {
            try {
                const response = await getEmployeeById(decodedToken.id);
                setEmployee(response.data);
            } catch (err) {
                setError('Ошибка при загрузке данных сотрудника');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    if (loading) return <div className="text-center">Загрузка...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Профиль Сотрудника</h1>
            <div className="mb-3">
                <h5>Полное имя</h5>
                <p>{employee?.fullName}</p>
            </div>
            <div className="mb-3">
                <h5>Электронная почта</h5>
                <p>{employee?.email}</p>
            </div>
            <div className="mb-3">
                <h5>Роль</h5>
                <p>{employee?.role === 'employee' ? 'Сотрудник' : 'Администратор'}</p>
            </div>
            <div className="mb-3">
                <h5>Доступ</h5>
                <p>{employee?.access.join(', ')}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
