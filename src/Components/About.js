// import React from 'react';
// import './About.css';

// function About() {
//     return (
//         <div className='about-container'>
//             <div className="about-content">
//                 <div className="about-image">
//                     <img src="https://www.gov.kz/uploads/2022/8/9/89921153e1c44057647effc49be73fdc_original.152545.jpg" alt="Абай" />
//                 </div>
//                 <div className="about-text">
//                     <p>
//                         Пайда ойлама, ар ойла,<br/>
//                         <br/>
//                         Талап қыл артық білуге.<br/>
//                         <br/>
//                         Артық білім кітапта,<br/>
//                         <br/>
//                         Ерінбей оқып көруге.
//                     </p>
//                     <span className="quote-author">- Абай Құнанбаев</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import './About.css';

function QuoteCard() {
  return (
    <div className="quote-card">
      <div className="quote-content">
        <div className="quote-mark">“</div>
             <p>
            Пайда ойлама, ар ойла,<br/>
            <br/>
            Талап қыл артық білуге.<br/>
            <br/>
            Артық білім кітапта,<br/>
            <br/>
            Ерінбей оқып көруге.
        </p>
        <div className="author-info">
          <img
            src="https://www.gov.kz/uploads/2022/8/9/89921153e1c44057647effc49be73fdc_original.152545.jpg" 
            alt="Profile"
            className="profile-pic"
          />
          <div className="author-details">
            <p className="author-name">- Абай Құнанбаев</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
