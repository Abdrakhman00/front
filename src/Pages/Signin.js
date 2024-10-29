import React, { useState } from 'react';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Для перенаправления

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('worker'); // По умолчанию "worker" (работник)
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Используем навигацию для перенаправления

    // URL для администратора и работника
    const API_URL_ADMIN = "http://localhost:3000/auth";
    const API_URL_WORKER = "http://localhost:3000/auth/employee";

    const loginCall = async (userCredential, apiUrl) => {
        try {
            const res = await axios.post(apiUrl, userCredential);
            
            // Сохраняем токен в локальном хранилище
            localStorage.setItem('token', res.data.token);

            // Перенаправляем на главную страницу
            navigate('/profile'); 
        } catch (err) {
            setError("Неправильный email или пароль");
        }
    };

    const sendForm = (e) => {
        e.preventDefault();
        
        // Выбор правильного URL в зависимости от роли
        const apiUrl = role === 'admin' ? API_URL_ADMIN : API_URL_WORKER;
        loginCall({ email, password }, apiUrl);
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={sendForm}>
                    <h2 className="signin-title">Авторизоваться</h2>
                    <p className="line"></p>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                            className='signin-textbox'
                            type="text"  // Заменили type="email" на type="text"
                            placeholder="Введите email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password"><b>Password</b></label>
                        <input
                            className='signin-textbox'
                            type="password"
                            minLength='6'
                            placeholder="Введите пароль"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Переключатель для выбора роли */}
                    <div className="role-selection">
                        <label>
                            <input 
                                type="radio" 
                                name="role" 
                                value="worker" 
                                checked={role === 'worker'} 
                                onChange={() => setRole('worker')} 
                            />
                            Работник
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="role" 
                                value="admin" 
                                checked={role === 'admin'} 
                                onChange={() => setRole('admin')} 
                            />
                            Администратор
                        </label>
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
