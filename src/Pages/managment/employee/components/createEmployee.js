import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Dropdown } from 'semantic-ui-react';
import { createEmployee } from '../api'; 

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
    fullName: Yup.string().notRequired(), // Полное имя не обязательно
    email: Yup.string()
        .required("Email обязателен")
        .matches(emailPattern, "Некорректный email"),
    password: Yup.string()
        .notRequired()
        .nullable()
        .test("is-valid-password", "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы", 
            value => {
                if (!value) return true; // Если пароль не предоставлен, пропускаем валидацию
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            }),
    access: Yup.array().notRequired(), // Доступ не обязательно
});

const CreateEmployeeModal = ({ onClose, onCreate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    const { control, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            access: [],
            password: ""
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        const filteredData = {
            fullName: data.fullName || undefined,
            email: data.email,
            access: data.access.length > 0 ? data.access : undefined,
            password: data.password || undefined
        };

        try {
            const result = await createEmployee(filteredData); 
            if (result.error) {
                setErrorMessage(result.error);
                setSuccessMessage(""); 
            } else {
                reset();
                clearErrors();
                setErrorMessage(""); 
                setSuccessMessage("Сотрудник успешно создан");
                onCreate(); 
                onClose(); 
            }
        } catch (error) {
            setErrorMessage("Произошла ошибка при добавлении сотрудника");
            setSuccessMessage(""); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать сотрудника</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Полное имя</label>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => <input className="form-control" {...field} />}
                            />
                            {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}

                            <label>Email<span className="required-field">*</span></label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <input className="form-control" type="email" {...field} />}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}

                            <label>Доступ</label>
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

                            <label>Пароль</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className="form-control"
                                        type="password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}

                            <button type="submit" className="btn btn-primary" disabled={isLoading}>Создать</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeModal;
