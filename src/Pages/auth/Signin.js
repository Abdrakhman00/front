import React from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {jwtDecode} from 'jwt-decode'; // Импортируем библиотеку для декодирования JWT
import { login } from './singnApi';
// Validation schema
const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email обязателен')
        .matches(/^[\w.-]+@(gmail\.com|yahoo\.com|icloud\.com|mail\.ru)$/i, 'Введите почту популярного провайдера'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, 'Пароль должен содержать минимум 8 символов, включая заглавные, строчные буквы, цифры и специальные символы'),
});

function Signin() {
    const navigate = useNavigate();

    // Form setup with validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const sendForm = async (data) => {
        try {
            const res = await login(data.email, data.password, "reader");

            localStorage.setItem('token', res.token);
            window.dispatchEvent(new Event('login'));

            // Декодируем токен
            const decodedToken = jwtDecode(res.token);
            console.log('Decoded Token:', decodedToken); // Выводим декодированный токен в консоль

            navigate(`/profile/${decodedToken.id}`); // Используем id из декодированного токена
        } catch (err) {
            // Обработка ошибок
            alert(err.message);
        }
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleSubmit(sendForm)}>
                    <h2 className="signin-title">Авторизоваться</h2>
                    <p className="line"></p>

                    <div className="error-message">
                        <p>{errors.email?.message || errors.password?.message}</p>
                    </div>

                    <div className="signin-fields">
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                            className='signin-textbox'
                            type="text"
                            placeholder="Введите email"
                            {...register('email')}
                        />

                        <label htmlFor="password"><b>Password</b></label>
                        <input
                            className='signin-textbox'
                            type="password"
                            placeholder="Введите пароль"
                            {...register('password')}
                        />
                    </div>

                    <button className="signin-button" type="submit">Авторизоваться</button>
                    <a className="forget-pass" href="#home">Забыли пароль?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">У вас нет учетной записи? Свяжитесь с библиотекарем</p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
