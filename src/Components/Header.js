import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import './Header.css';

function Header() {
    const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem('token'));
    const [menutoggle, setMenutoggle] = useState(false);

    const toggleMenu = () => setMenutoggle(prev => !prev);
    const closeMenu = () => setMenutoggle(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserLoggedIn(false);
        closeMenu();
    };

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            setUserLoggedIn(!!token);
        };

        // Отслеживаем изменения в localStorage и настраиваем слушатель на событие входа
        window.addEventListener('storage', checkToken);
        window.addEventListener('login', checkToken); // слушаем кастомное событие

        return () => {
            window.removeEventListener('storage', checkToken);
            window.removeEventListener('login', checkToken);
        };
    }, []);

    return (
        <div className="header">
            <div className="logo-nav">
                <Link to='/'>
                    <img src='/assets/images/logo_agakaz_b.png' alt='Logo' className="logo-image" />
                    <span>ABIS</span>
                </Link>
            </div>
            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Поиск книги' />
                <ul className={`nav-options ${menutoggle ? 'active' : ''}`}>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/'><span>Главная</span></Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/books'><span>Книги</span></Link>
                    </li>
                    <li className="option" onClick={userLoggedIn ? handleLogout : closeMenu}>
                        <Link to={userLoggedIn ? '#' : '/signin'}>
                            <span>{userLoggedIn ? 'Выйти' : 'Войти'}</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mobile-menu" onClick={toggleMenu}>
                {menutoggle ? <ClearIcon className="menu-icon" fontSize="large" /> : <MenuIcon className="menu-icon" fontSize="large" />}
            </div>
        </div>
    );
}

export default Header;
