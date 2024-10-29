// import React from 'react'
// import './ImageSlider.css'
// import { Carousel } from 'react-bootstrap'



// function ImageSlider() {


// //     return (
// //         <div className='background-image'>
// //             <img className="d-block w-100"
// //             src='/assets/images/123123.png' 
// //             alt='Aviation Academy Library Background' />
// //         </div>
//         // <div className='slider'>
//         //     {/* <Carousel>
//         //         <Carousel.Item interval={1000}>
//         //             <img
//         //                 className="d-block w-100"
//         //                 src= '/assets/images/image1.jpg'
//         //                 alt="First slide"
//         //             />
//         //             <Carousel.Caption>
//         //                 <h3>First slide label</h3>
//         //                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         //             </Carousel.Caption>
//         //         </Carousel.Item>
//         //         <Carousel.Item interval={500}>
//         //             <img
//         //                 className="d-block w-100"
//         //                 src="/assets/images/img2.jpg"
//         //                 alt="Second slide"
//         //             />
//         //             <Carousel.Caption>
//         //                 <h3>Second slide label</h3>
//         //                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         //             </Carousel.Caption>
//         //         </Carousel.Item>
//         //         <Carousel.Item>
//         //             <img
//         //                 className="d-block w-100"
//         //                 src="/assets/images/image_3.png"
//         //                 alt="Third slide"
//         //             />
//         //             <Carousel.Caption>
//         //                 <h3>Third slide label</h3>
//         //                 <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//         //             </Carousel.Caption>
//         //         </Carousel.Item>
//         //     </Carousel> */}
//         // // </div>
// //     )
// }

// export default ImageSlider

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookIcon from '@material-ui/icons/Book';
import './ImageSlider.css';

function App() {
    return (
      <div className="hero-container" >
        {/* Background Image */}
        <img 
          className="background-image"
          src='/assets/images/123123.png' 
          alt='Aviation Academy Library Background' 
        />

        {/* Content with text and stats */}
        <div className="content">
          <h1>Библиотека Академии Гражданской Авиации</h1>
          
          {/* Divider with plane icon */}
          <div className="divider">
            <div className="line"></div>
            <FontAwesomeIcon icon={faPlane} className="plane-icon" />
            <div className="line"></div>
          </div>
          
          {/* Statistics section */}
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">7366</div>
              <LibraryBooksIcon className='stats-icon' style={{ fontSize:80 }}/>
              <div className="stat-label">Общее количество книг</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-value">845</div>
              <LocalLibraryIcon className='stats-icon' style={{ fontSize:80 }}/>
              <div className="stat-label">Общее количество участников</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-value">17</div>
              <BookIcon className='stats-icon' style={{ fontSize:80 }}/>
              <div className="stat-label">Бронирование</div>
            </div>
            
          </div>
        </div>
      </div>
    );
}

export default App;
