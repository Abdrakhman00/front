import React from 'react'
import './Footer.css'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details" style={{color:'#ffff'}}>
                        <h1>Контакты</h1>
                        <p>Алматы</p>
                        <p>
                        ул. Закарпатская, 44050039, Алматы
                        <br />
                        Республика Казахстан</p>
                        <div style={{borderRadius: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <FaPhoneAlt style={{ marginRight: '5px', fontSize: '18px' }} />
                                <a href="tel:+77273399929" style={{ color: '#FFFFFF', textDecoration: 'none' }}>+7 (727) 339-99-29</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaEnvelope style={{ marginRight: '10px',fontSize: '18px' }} />
                                <a href="mailto:sscenter@agakaz.kz" style={{ color: '#FFFFFF', textDecoration: 'none' }}>sscenter@agakaz.kz</a>
                            </div>
                        </div>
                        </div>
                    <div className='usefull-links'>
                        <h1>Быстрые ссылки</h1>
                        <a href='#home'>О нас</a>
                        <a href='#home'>Link-1</a>
                    </div>
                    <div className="contact-social">
                        <h1>Социальные сети:</h1>
                        <div className="social-icons"> {/* Оборачиваем иконки в div с классом */}
                            <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40, color: "while" }} /></a>
                            <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40, color: "while" }} /></a>
                            <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40, color: "while" }} /></a>
                            <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40, color: "while" }} /></a>
                        </div>
                    </div>
                    {/* <div className='librarian-details'>
                        <h1>Librarian</h1>
                        <p>Name</p>
                        <p>Education</p>
                        <p>Contact: +91 9123456787</p>
                    </div> */}
                </div>
                {/* <div className="contact-social" >
                    <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                </div> */}
            </div>
            <div className='copyright-details' style={{color:'#ffff'}}>
                <p className='footer-copyright'>&#169; 1995 - 2024 Библиотека Академии Гражданской Авиации<br /></p>
            </div>
        </div>
    )
}

export default Footer