// src/components/EmployeeList.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllEmployees,
    deleteEmployee,
    getEmployeeById
} from './api';
import CreateEmployeeModal from './components/createEmployee';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleViewDetails = (id) => {
        navigate(`/employee/${id}`); // Navigate to the dynamic page
    };
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm(`Вы уверены, что хотите удалить сотрудника с ID: ${id}?`);
        if (confirmation) {
            const result = await deleteEmployee(id);
            if (result.error) {
                setError(result.error);
            } else {
                fetchEmployees();
            }
        }
    };



    const closeModal = () => {
        setSelectedEmployee(null);
    };

    const handleCreate = () => {
        fetchEmployees();
        setShowCreateModal(false);
    };

    return (
        <div className="container mt-4">
            <h2>Список сотрудников</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowCreateModal(true)}>
                Создать сотрудника
            </button>
            {loading ? (
                <div className="text-center">Загрузка...</div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Полное имя</th>
                            <th>Email</th>
                            <th>Доступ</th>
                            <th>Детали</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">Нет сотрудников для отображения</td>
                            </tr>
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>{employee.fullName || 'Не указано'}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.access ? employee.access.join(", ") : 'Не указано'}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => handleViewDetails(employee._id)}>
                                            Смотреть
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {/* Модальное окно для деталей сотрудника */}
            {selectedEmployee && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Детали сотрудника</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Полное имя:</strong> {selectedEmployee.fullName || 'Не указано'}</p>
                                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                <p><strong>Доступ:</strong> {selectedEmployee.access ? selectedEmployee.access.join(", ") : 'Не указано'}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно для создания сотрудника */}
            {showCreateModal && (
                <CreateEmployeeModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
            )}
        </div>
    );
};

export default EmployeeList;
