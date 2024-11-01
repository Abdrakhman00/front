import React, { useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { Dropdown } from 'semantic-ui-react';
import { yupResolver } from "@hookform/resolvers/yup";
import { createEmployee } from '../api'; // Убедитесь, что путь к вашему файлу правильный

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


const emailPattern = /^[\w.-]+@(gmail\.com|yahoo\.com|icloud\.com|mail\.ru)$/i;

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email обязателен")
        .matches(emailPattern, "Email должен быть валидным адресом (gmail.com, yahoo.com, icloud.com, mail.ru)"),
    fullName: Yup.string().notRequired(), // Имя не обязательно
    access: Yup.array().notRequired(), // Доступ не обязательно
    password: Yup.string()
        .notRequired()
        .nullable()
        .test("is-valid-password", "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы", 
            value => {
                if (!value) return true; // Если пароль не предоставлен, пропускаем валидацию
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            }),
});

function AddStaffMember() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Новая переменная для сообщения об успешном создании
    
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
            const result = await createEmployee(filteredData, localStorage.getItem("token"));
            if (result.error) {
                setErrorMessage(result.error);
                setSuccessMessage(""); // Очищаем сообщение об успехе
            } else {
                reset();
                clearErrors();
                setErrorMessage(""); // Очищаем сообщение об ошибке
                setSuccessMessage("Сотрудник успешно создан"); // Устанавливаем сообщение об успехе
            }
        } catch (error) {
            setErrorMessage("Произошла ошибка при добавлении сотрудника");
            setSuccessMessage(""); // Очищаем сообщение об успехе
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="dashboard-option-title">Добавить сотрудника</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={handleSubmit(onSubmit)}>
                
                <label className="addmember-form-label">Полное имя</label>
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => <input className="addmember-form-input" {...field} />}
                />
                {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}

                <label className="addmember-form-label">Email<span className="required-field">*</span></label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input className="addmember-form-input" type="email" {...field} />}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}

                <label className="addmember-form-label">Доступ</label>
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
                {errors.access && <p className="error-text">{errors.access.message}</p>}

                <label className="addmember-form-label">Пароль</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <input
                            className="addmember-form-input"
                            type="password"
                            {...field}
                        />
                    )}
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}

                {/* Отображение сообщений об ошибках или успехе */}
                {errorMessage && <p className="error-text">{errorMessage}</p>}
                {successMessage && <p className="success-text">{successMessage}</p>}

                <input className="addmember-submit" type="submit" value="ОТПРАВИТЬ" disabled={isLoading} />
            </form>
        </div>
    );
}

export default AddStaffMember;
