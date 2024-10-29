import React, { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom'; // Для перенаправления
import { login } from './singnApi'; // Импортируем функцию login

function SigninSystem() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // По умолчанию выбираем роль "reader"
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Используем навигацию для перенаправления

    const sendForm = async (e) => {
        e.preventDefault();
        
        try {
            const res = await login(email, password, role); // Передаем роль
            localStorage.setItem('token', res.token);

            // Перенаправляем на соответствующую страницу в зависимости от роли
            if (role === 'admin') {
                navigate('/admin-dashboard'); // Страница для администраторов
            } else {
                navigate('/profile'); // Страница для сотрудников/читателей
            }
        } catch (err) {
            setError(err.message);
        }
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
                                value="employee" 
                                checked={role === 'employee'} 
                                onChange={() => setRole('employee')} 
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
               
            </div>
        </div>
    );
}

export default SigninSystem;
