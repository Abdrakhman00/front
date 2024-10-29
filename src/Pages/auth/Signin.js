import React, { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom'; // Для перенаправления
import { login } from './singnApi'; // Импортируем функцию login

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Используем навигацию для перенаправления

    const sendForm = async (e) => {
        e.preventDefault();
        
        try {
            const res = await login(email, password, "reader");
            localStorage.setItem('token', res.token);

            navigate('/profile'); 
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
