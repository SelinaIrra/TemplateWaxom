import React, {useEffect, useState} from 'react';
import './App.css';

function Section4() {

    const deadline = "September 05 2020 16:00:00 GMT+0400";
    const [days, setDays] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    useEffect(() => {
        initializeClock(deadline);   
    })

    const getTimeRemaining = (endtime) => {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    const initializeClock = (endtime) => {

        function updateClock() {
            var t = getTimeRemaining(endtime);

            setDays(t.days);
            setHours(('0' + t.hours).slice(-2));
            setMinutes(('0' + t.minutes).slice(-2));
            setSeconds(('0' + t.seconds).slice(-2))

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    return <div className="Section4">
        <div className="flowersSection">
            <div></div>
            <div>
                <p style={{textAlign: 'center'}}>
                    Так как после свадьбы мы планируем отправиться в свадебное путешествие, пожалуйста,
                    НЕ дарите нам цветы! Наши флористы и декораторы обеспечат невесту букетом, а свадьбу красивыми декорациями. 
                    Вместо цветов можно подарить бутылочку алкоголя, которую мы вместе с Вами опустошим по приятному поводу...или без....
                </p>
            </div>
            <div></div>
        </div>
        <div id="timer">
            <p style={{textAlign: 'center'}}>Мы поженимся через</p>
            <div className="countdown">
                <div className="countdown-number">
                    <div id="heart"><div className="k"></div></div>
                    <span className="days count" style={{marginLeft: '-12px'}}>{days}</span>
                    <span className="countdown-text">Дней</span>
                </div>
                <div className="countdown-number">
                    <div id="heart"><div className="k"></div></div>
                    <span className="hours count" style={{marginLeft: '-15px'}}>{hours}</span>
                    <span className="countdown-text">Часов</span>
                </div>
                <div className="countdown-number">
                    <div id="heart"><div className="k"></div></div>
                    <span className="minutes count">{minutes}</span>
                    <span className="countdown-text">Минут</span>
                </div>
                <div className="countdown-number">
                    <div id="heart"><div className="k"></div></div>
                    <span className="seconds count">{seconds}</span>
                    <span className="countdown-text">Секунд</span>
                </div>
            </div>
        </div>
    </div>
}

export default Section4;
