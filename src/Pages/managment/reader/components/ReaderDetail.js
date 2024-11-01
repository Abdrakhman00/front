import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getReaderById, updateReader } from '../api';
import { Modal, Button, Form } from 'react-bootstrap';

// Validation schema with Yup
const emailPattern = /^[\w.-]+@(gmail\.com|yahoo\.com|icloud\.com|mail\.ru)$/i;

const validationSchema = Yup.object().shape({
    fullName: Yup.string().notRequired(),
    email: Yup.string()
        .required("Email обязателен")
        .matches(emailPattern, "Некорректный email"),
    photo: Yup.string().url("Некорректный URL фото").nullable().notRequired(),
    role: Yup.string().required("Роль обязательна"),
    password: Yup.string()
        .notRequired()
        .nullable()
        .test("is-valid-password", "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы", 
            value => {
                if (!value) return true; // Если пароль не предоставлен, пропускаем валидацию
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            }),
});

const ReaderDetails = () => {
    const { id } = useParams();
    const [reader, setReader] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { control, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            photo: "",
            role: "reader",
            password: "", // Добавляем поле для пароля
        }
    });

    useEffect(() => {
        const fetchReader = async () => {
            try {
                const data = await getReaderById(id);
                setReader(data);
                reset(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReader();
    }, [id, reset]);

    const handleClose = () => {
        setShowModal(false);
        clearErrors();
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const onSubmit = async (data) => {
        // Фильтруем данные перед отправкой
        const filteredData = {
            fullName: data.fullName || undefined,
            email: data.email,
            photo: data.photo || undefined,
            role: data.role,
            ...(data.password ? { password: data.password } : {}), // Включаем пароль только если он указан
        };

        try {
            const result = await updateReader(id, filteredData);
            if (result.error) {
                setError(result.error);
            } else {
                reset(data);
                setShowModal(false);
                setError(null);
            }
        } catch (error) {
            setError("Произошла ошибка при обновлении данных читателя");
        }
    };

    if (loading) return <div className="text-center">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            {reader ? (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Детали читателя</h2>
                        <p><strong>Полное имя:</strong> {reader.fullName || 'Не указано'}</p>
                        <p><strong>Email:</strong> {reader.email}</p>
                        <p><strong>Роль:</strong> {reader.role}</p>
                        <p><strong>Фото:</strong> {reader.photo ? <img src={reader.photo} alt="Фото читателя" width="100" /> : 'Не указано'}</p>
                        <Button variant="primary" onClick={handleShow}>
                            Редактировать
                        </Button>
                    </div>
                </div>
            ) : (
                <div>Читатель не найден</div>
            )}

            {/* Modal for editing Reader details */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать читателя</Modal.Title>
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
                            <Form.Label>Пароль</Form.Label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Form.Control type="password" {...field} />}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
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

export default ReaderDetails;
