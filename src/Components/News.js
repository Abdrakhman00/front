import React from 'react';
import './News.css';

const App = () => {
    return (
        <div className="d-flex align-items-stretch mt-4 wow fadeInUp animated container-fluid" style={{ backgroundColor: 'rgb(0, 36, 156)' }}>
            <div className="col-12 icon-box virtual_adm row" style={{ padding: '10px 20px' }}>
                <div className="col-sm-12 col-md-3 col-lg-2">
                    <p align="center">
                        <img 
                            alt="Ministry of Science Logo" 
                            src="https://caa.edu.kz/assets/images/library/MinistryOfScience150x150.png" 
                            style={{ width: '85px' }} 
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-9 col-lg-10" style={{ display: 'grid', alignItems: 'center' }}>
                    <h4 style={{ textAlign: 'left' }} role="heading" level="2">
                        <a 
                            className="stretched-link" 
                            href="https://caa.edu.kz/ministerstvo-obrazovaniya-i-nauki-respubliki-kazahstan-razrabotalo-elektronnye-portaly-napravlennye-na-rasshirenie-ispolzovaniya-kazahskogo-yazyka-403" 
                        >
                            Министерство науки и высшего образования Республики Казахстан разработало электронные порталы, направленные на расширение использования казахского языка.Подробнее...
                        </a>
                    </h4>
                </div>
            </div>
            <hr style={{ background: 'darkblue', margin: '50px 0 45px 0' }} />
        </div>
    );
};

export default App;
