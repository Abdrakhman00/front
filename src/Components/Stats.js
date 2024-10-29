import React from 'react';
import './Stats.css';

const App = () => {
    return (
        <div className="container">
            <h1 className="title">ПОДПИСНЫЕ БАЗЫ ДАННЫХ</h1>
            <div className="grid">
                <div className="item">
                    <img src="https://caa.edu.kz/assets/images/library/riel.png" alt="РМЭБ logo" className="logo" />
                    <h2 className="item-title">РМЭБ</h2>
                    <p>Республиканская межвузовская электронная библиотека - информационная и справочно-поисковая библиотечная система</p>
                </div>
                <div className="item">
                    <img src="https://placehold.co/100x100" alt="IPR SMART logo" className="logo" />
                    <h2 className="item-title">IPR SMART</h2>
                    <p>Содержится литература по различным группам специальностей, что дает возможность учебным заведениям разных профилей найти интересующие их издания</p>
                </div>
                <div className="item">
                    <img src="https://placehold.co/100x100" alt="EBSCO logo" className="logo" />
                    <h2 className="item-title">EBSCO</h2>
                    <p>EBSCO Publishing - крупнейший поставщик научных ресурсов ведущих издательств мира</p>
                </div>
                <div className="item">
                    <img src="https://placehold.co/100x100" alt="Library of Congress logo" className="logo" />
                    <h2 className="item-title">Library of Congress</h2>
                    <p>Библиотека Конгресса является крупнейшей библиотекой в мире, в ее фондах хранятся миллионы книг, фильмов и видео, аудиозаписей, фотографий, газет, карт и рукописей. Библиотека является главным исследовательским подразделением Конгресса США и штаб-квартирой Управления авторского права США.</p>
                </div>
                <div className="item">
                    <img src="https://placehold.co/100x100" alt="ICAO eLibrary logo" className="logo" />
                    <h2 className="item-title">ICAO eLibrary</h2>
                    <p>Электронная библиотека ИКАО - это онлайн-хранилище публикаций Международной организации гражданской авиации (ИКАО), содержащих стандарты и рекомендуемую практику (SARPS) в области международной гражданской авиации, включая и связанные с ними документы.</p>
                </div>
                <div className="item">
                    <img src="https://placehold.co/100x100" alt="Scopus logo" className="logo" />
                    <h2 className="item-title">Scopus</h2>
                    <p>Scopus - это крупнейшая информационная база рецензируемых библиографических ссылок и рефератов: научных журналов, книг и материалов конференций.</p>
                </div>
            </div>
        </div>
    );
};

export default App;
