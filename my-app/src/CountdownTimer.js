import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timer, updateTimer }) => {
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(timer.timeRemaining || 0);
    const [isActive, setIsActive] = useState(timer.isActive);
    const [timerTitle, setTimerTitle] = useState(timer.title);

    useEffect(() => {
        let timerInterval = null;
        if (isActive && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((previousTime) => {
                    if (previousTime <= 1) {
                        clearInterval(timerInterval);
                        const endTime = new Date().toLocaleString();
                        console.log('Countdown complete!');
                        updateTimer(timer.id, { isActive: false, isCompleted: true, endTime });
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
        updateTimer(timer.id, { timeRemaining: totalTime, isActive: true, title: timerTitle });
    };

    const stopTimer = () => {
        setIsActive(false);
        updateTimer(timer.id, { isActive: false });
    };

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return (
        <div>
            {isActive ? (
                <h2>{timerTitle}</h2>
            ) : (
                <input 
                    type="text" 
                    value={timerTitle} 
                    onChange={(e) => setTimerTitle(e.target.value)} 
                    placeholder="Enter timer title"
                />
            )}
            {isActive ? (
                <>
                    <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
                    <button onClick={stopTimer}>Cancel</button>
                </>
            ) : timer.isCompleted ? (
                <div>
                    <h2>{timerTitle}</h2>
                    <p>Timer completed at: {timer.endTime}</p>
                </div>
            ) : (
                <div>
                    <input
                        type="number"
                        value={inputHours}
                        onChange={(e) => setInputHours(e.target.value)}
                        placeholder="Hours"
                        size={2}
                    />:
                    <input
                        type="number"
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(e.target.value)}
                        placeholder="Minutes"
                        size={2}
                    />:
                    <input
                        type="number"
                        value={inputSeconds}
                        onChange={(e) => setInputSeconds(e.target.value)}
                        placeholder="Seconds"
                        size={2}
                    />
                    <button onClick={startTimer}>Start Timer</button>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
