import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {

    const [menutoggle, setMenutoggle] = useState(false)

    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenutoggle(false)
    }

    return (
        <div className="header">
            <div className="logo-nav">
            <Link to='/'>
                <img src='/assets/images/logo_agakaz_b.png' alt='Logo' className="logo-image" />
                <a href="#home">ABIS</a>
            </Link>
            </div>
            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Поиск книги'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/'>
                            <a href="#home">Главная</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/books'>
                        <a href="#books">Книги</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/signin'>
                        <a href='signin'>Войти</a>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mobile-menu" onClick={() => { Toggle() }}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header