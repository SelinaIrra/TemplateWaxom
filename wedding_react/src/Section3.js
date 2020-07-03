import React, { useState } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Section3() {
    const [cSlide, setSlide] = useState(0);

    const handleNextSlide = () => {
        setSlide(cSlide === 2 ? 0 : cSlide + 1)
    }

    const handlePrevSlide = () => {
        setSlide(cSlide === 0 ? 2 : cSlide - 1)
    }

    return <div className="Section3 Section-flex">
        <div className="Section3-corner top"></div>
        <Button onClick={handlePrevSlide} style={{ position: "absolute", left: '10px', top: '50%' }}> 
            <ArrowBackIosIcon fontSize="large"/>
        </Button>
        <div className="Section-flex">
            {cSlide === 0 &&
                <div className="Section3-slidesblock">
                    <div>
                        <div className="imgCouple"></div>
                        <p className="blocktitle">Церемония и банкет</p>
                        <p>5 сентября 2020 в 16:00</p>
                        <br></br>
                        <p>г.Саратов, ПКиО им.Горького, Шатер "Зефир", <br></br> ул. Чернышевского 81/83</p>
                    </div>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab975a5cb533095884d16b984981bab58c7645549e78fc075a1a2db65105b67dc&amp;source=constructor"
                        width="40%" height="400" frameBorder="0">
                    </iframe>
                </div>}
            {cSlide === 1 &&
                <div className="Section3-slidesblock">
                    <div>
                        <div className="imgDress"></div>
                        <p className="blocktitle">Дресс-код</p>
                        <p style={{ textAlign: 'center', maxWidth: '700px' }}>Конечно, сейчас модно просить гостей придерживаться
                            определенного цвета в нарядах, но так как путешествие – это
                            определенного рода свобода, мы лишь рекомендуем
                            использовать в одежде пастельные тона в сочетании с базовыми
                        </p>
                    </div>
                    <div className="dress">
                        <div></div>
                        <div>
                            <div className="color1"></div>
                            <div className="color2"></div>
                            <div className="color3"></div>
                            <div className="color4"></div>
                            <div className="color5"></div>
                            <div className="color6"></div>
                            <div className="color7"></div>
                        </div>
                    </div>
                </div>}
            {cSlide === 2 &&
                <div className="Section3-slidesblock">
                    <div>
                        <p style={{ textAlign: 'center', maxWidth: '700px' }} className="Section3-text" >
                            Мы хотим, чтобы этот день надолго остался в памяти,
                            а чтобы воспоминания было удобнее найти и сохранить,
                            пожалуйста, используйте при публикациях
                    </p>
                        <p className="blocktitle" style={{ border: 0, margin: 0, padding: 0, paddingTop: '20px' }}>
                            #KlimchenkoTravel
                    </p>
                    </div>
                    <div className="hugs">
                        <div></div>
                        <div className="calmcolor"></div>
                    </div>
                </div>}
        </div>
        <Button onClick={handleNextSlide} style={{ position: "absolute", right: '10px', top: '50%' }}>
            <ArrowForwardIosIcon fontSize="large" />
        </Button>
        <div className="Section3-corner bottom"></div>
    </div>
}

export default Section3;
