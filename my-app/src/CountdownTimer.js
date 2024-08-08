import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timer, updateTimer }) => {
    const [timeRemaining, setTimeRemaining] = useState(timer.timeRemaining || 0);
    const [isActive, setIsActive] = useState(timer.isActive);
    const [timerTitle, setTimerTitle] = useState(timer.title);

    useEffect(() => {
        setTimeRemaining(timer.timeRemaining);
        setIsActive(timer.isActive);
        setTimerTitle(timer.title);
    }, [timer]);

    useEffect(() => {
        let timerInterval = null;
        if (isActive && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((previousTime) => {
                    if (previousTime <= 1) {
                        clearInterval(timerInterval);
                        const endTime = new Date().toLocaleString();
                        updateTimer(timer.id, { isActive: false, isCompleted: true, endTime, timeRemaining: 0 });
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
    }, [isActive, timeRemaining, timer.id, updateTimer]);

    const startTimer = () => {
        const totalTime = timeRemaining || 
            (parseInt(timer.timeRemaining) || (parseInt(timer.hours) * 3600) + (parseInt(timer.minutes) * 60) + parseInt(timer.seconds));
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
            <input 
                type="text" 
                value={timerTitle} 
                onChange={(e) => setTimerTitle(e.target.value)} 
                placeholder="Enter timer title"
                disabled={isActive}
            />
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
                        value={hours}
                        onChange={(e) => setTimeRemaining((parseInt(e.target.value) * 3600) + (minutes * 60) + seconds)}
                        placeholder="Hours"
                        size={2}
                        disabled={isActive}
                    />:
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setTimeRemaining((hours * 3600) + (parseInt(e.target.value) * 60) + seconds)}
                        placeholder="Minutes"
                        size={2}
                        disabled={isActive}
                    />:
                    <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setTimeRemaining((hours * 3600) + (minutes * 60) + parseInt(e.target.value))}
                        placeholder="Seconds"
                        size={2}
                        disabled={isActive}
                    />
                    <button onClick={startTimer} disabled={isActive}>Start Timer</button>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
