import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Dropdown } from 'semantic-ui-react';
import { getEmployeeById, updateEmployee } from '../api'; // Импортируем функции для получения и обновления данных сотрудника
import { Modal, Button, Form } from 'react-bootstrap'; // Импортируем компоненты Bootstrap

// Определяем доступные типы доступа
const accessTypes = [
    { value: "Библиотека", text: "Библиотека" },
    { value: "Регистрация", text: "Регистрация" },
    { value: "Обслуживание", text: "Обслуживание" },
    { value: "Каталогизация", text: "Каталогизация" },
    { value: "Комплектование", text: "Комплектование" },
    { value: "Подписка", text: "Подписка" },
    { value: "Администрирование", text: "Администрирование" },
    { value: "Книгообеспеченность", text: "Книгообеспеченность" },
    { value: "Полный доступ", text: "Полный доступ" }
];


// Определяем схему валидации с помощью Yup
const emailPattern = /^[\w.-]+@(gmail\.com|yahoo\.com|icloud\.com|mail\.ru)$/i;

const validationSchema = Yup.object().shape({
    fullName: Yup.string().notRequired(),
    email: Yup.string()
        .required("Email обязателен")
        .matches(emailPattern, "Некорректный email"),
    access: Yup.array().notRequired(),
});

const EmployeeDetails = () => {
    const { id } = useParams(); // Получаем id из URL
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { control, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            access: [],
        }
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data);
                reset(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id, reset]);

    const handleClose = () => {
        setShowModal(false);
        clearErrors();
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const onSubmit = async (data) => {
        const filteredData = {
            fullName: data.fullName || undefined,
            email: data.email,
            access: data.access.length > 0 ? data.access : undefined,
        };

        try {
            const result = await updateEmployee(id, filteredData); // Обновляем данные сотрудника
            if (result.error) {
                setError(result.error);
            } else {
                reset(data);
                setShowModal(false);
                setError(null); // Сбрасываем ошибку
            }
        } catch (error) {
            setError("Произошла ошибка при обновлении данных сотрудника");
        }
    };

    if (loading) return <div className="text-center">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            {employee ? (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Детали сотрудника</h2>
                        <p><strong>Полное имя:</strong> {employee.fullName || 'Не указано'}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Доступ:</strong>
                            {employee.access && employee.access.length > 0 ? (
                                <ul>
                                    {employee.access.map((access, index) => (
                                        <li key={index}>{access}</li>
                                    ))}
                                </ul>
                            ) : (
                                'Нет доступа'
                            )}
                        </p>
                        <Button variant="primary" onClick={handleShow}>
                            Редактировать
                        </Button>
                    </div>
                </div>
            ) : (
                <div>Сотрудник не найден</div>
            )}

            {/* Модальное окно для редактирования сотрудника */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать сотрудника</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Полное имя</Form.Label>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => <Form.Control {...field} />}
                            />
                            {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email<span className="required-field">*</span></Form.Label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Form.Control type="email" {...field} />}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Доступ</Form.Label>
                            <Controller
                                name="access"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        placeholder='Выберите права доступа'
                                        fluid
                                        multiple
                                        selection
                                        options={accessTypes}
                                        {...field}
                                        onChange={(e, data) => field.onChange(data.value)}
                                    />
                                )}
                            />
                            {errors.access && <p className="text-danger">{errors.access.message}</p>}
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button type="submit" variant="primary">Сохранить изменения</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EmployeeDetails;
