// src/components/ReaderList.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllReaders,
    deleteReader,
    getReaderById
} from './api';
import CreateReaderModal from './components/createReader';

const ReaderList = () => {
    const navigate = useNavigate();
    const [readers, setReaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReader, setSelectedReader] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleViewDetails = (id) => {
        navigate(`/reader/${id}`);
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    const fetchReaders = async () => {
        try {
            const data = await getAllReaders();
            setReaders(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm(`Вы уверены, что хотите удалить читателя с ID: ${id}?`);
        if (confirmation) {
            const result = await deleteReader(id);
            if (result.error) {
                setError(result.error);
            } else {
                fetchReaders();
            }
        }
    };

    const closeModal = () => {
        setSelectedReader(null);
    };

    const handleCreate = () => {
        fetchReaders();
        setShowCreateModal(false);
    };

    return (
        <div className="container mt-4">
            <h2>Список читателей</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowCreateModal(true)}>
                Создать читателя
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
                            <th>Роль</th>
                            <th>Детали</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {readers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">Нет читателей для отображения</td>
                            </tr>
                        ) : (
                            readers.map((reader) => (
                                <tr key={reader._id}>
                                    <td>{reader.fullName || 'Не указано'}</td>
                                    <td>{reader.email}</td>
                                    <td>{reader.role}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => handleViewDetails(reader._id)}>
                                            Смотреть
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(reader._id)}>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {/* Модальное окно для деталей читателя */}
            {selectedReader && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Детали читателя</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Полное имя:</strong> {selectedReader.fullName || 'Не указано'}</p>
                                <p><strong>Email:</strong> {selectedReader.email}</p>
                                <p><strong>Роль:</strong> {selectedReader.role}</p>
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

            {/* Модальное окно для создания читателя */}
            {showCreateModal && (
                <CreateReaderModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
            )}
        </div>
    );
};

export default ReaderList;
