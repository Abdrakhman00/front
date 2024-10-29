import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '..//Context/AuthContext'; // Импортируйте AuthContext
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import './Header.css';

function Header() {
    const { user, dispatch } = useContext(AuthContext); // Используйте контекст
    const [menutoggle, setMenutoggle] = useState(false);

    const toggleMenu = () => setMenutoggle(prev => !prev);
    const closeMenu = () => setMenutoggle(false);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" }); // Вызовите действие выхода
        closeMenu();
    };

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
                    <li className="option" onClick={user ? handleLogout : closeMenu}>
                        <Link to={user ? '#' : '/signin'}>
                            <span>{user ? 'Выйти' : 'Войти'}</span>
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
