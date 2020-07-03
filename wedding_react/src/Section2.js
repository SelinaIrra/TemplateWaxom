import React from 'react';
import './App.css';

function Section2() {

    return <div className="Section2">
        <div className="Section2-content">
            <div className="Section2-photo">
                <div className="calmcolor"></div>
            </div>
            <div className="Section2-info">
                <div>
                    <p style={{fontSize: '18px'}}>Дорогие наши родственники и друзья!</p>
                    <p> Мы хотим пригласить Вас в увлекательное
                        путешествие, с которого начнется наша счастливая
                        и долгая семейная жизнь!
                        <br></br>
                        <br></br>
                        Да, да! Слава и Таня женятся! Это правда.
                        По такому поводу и праздник будет соответствующим,
                        поэтому мы будем очень рады Вас видеть!
                    </p>
                 </div>
            </div>
        </div>
        <div className="Section2-journey">
            <div>
                <hr></hr>
                <p>Love is a journey</p>
                <hr></hr>
            </div>
            <p>not a destination</p>
            <hr></hr>
        </div>
    </div>
}

export default Section2;
