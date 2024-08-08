import React, { useState, useEffect } from 'react';

const CountDownTimer = () => {
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timerInterval = null;
        if (isActive && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((previousTime) => {
                    if (previousTime <= 1) {
                        clearInterval(timerInterval);
                        console.log('Countdown complete!');
                        setIsActive(false);
                        return 0;
                    } else {
                        return previousTime - 1;
                    }
                });
            }, 1000);
        } else if (timeRemaining === 0 && isActive) {
            setIsActive(false);
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [isActive, timeRemaining]);

    const startTimer = () => {
        const totalTime = (parseInt(inputHours) * 3600) + (parseInt(inputMinutes) * 60) + parseInt(inputSeconds);
        setTimeRemaining(totalTime);
        setIsActive(true);
    };

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return (
        <div>
            <h2>Countdown Timer</h2>
            <div>
                <input
                    type="number"
                    value={inputHours}
                    onChange={(e) => setInputHours(e.target.value)}
                    placeholder="Hours"
                />
                <input
                    type="number"
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(e.target.value)}
                    placeholder="Minutes"
                />
                <input
                    type="number"
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(e.target.value)}
                    placeholder="Seconds"
                />
                <button onClick={startTimer}>Start Timer</button>
            </div>
            <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
        </div>
    );
};

export default CountDownTimer;
