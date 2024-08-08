import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';

const App = () => {
    const [timers, setTimers] = useState([]);
    const [timerCount, setTimerCount] = useState(0);
    const [selectedTimerId, setSelectedTimerId] = useState(null);

    useEffect(() => {
        const timerIntervals = timers.map(timer => {
            if (timer.isActive && timer.timeRemaining > 0) {
                return setInterval(() => {
                    setTimers(currentTimers => currentTimers.map(t => {
                        if (t.id === timer.id) {
                            const newTimeRemaining = t.timeRemaining - 1;
                            return {
                                ...t,
                                timeRemaining: newTimeRemaining,
                                isActive: newTimeRemaining > 0,
                                isCompleted: newTimeRemaining === 0 ? true : t.isCompleted,
                                endTime: newTimeRemaining === 0 ? new Date().toLocaleString() : t.endTime,
                            };
                        }
                        return t;
                    }));
                }, 1000);
            }
            return null;
        });

        return () => {
            timerIntervals.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, [timers]);

    const addNewTimer = () => {
        const newTimer = {
            id: timerCount,
            title: `Timer ${timerCount + 1}`,
            isActive: false,
            timeRemaining: 0,
            isCompleted: false,
            endTime: null,
        };
        setTimers([...timers, newTimer]);
        setSelectedTimerId(newTimer.id);
        setTimerCount(timerCount + 1);
    };

    const updateTimer = (id, updatedTimer) => {
        setTimers(timers.map(timer =>
            timer.id === id ? { ...timer, ...updatedTimer } : timer
        ));
    };

    const selectTimer = (id) => {
        setSelectedTimerId(id);
    };

    const selectedTimer = timers.find(timer => timer.id === selectedTimerId);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ccc' }}>
                <h2>Timers</h2>
                <button onClick={addNewTimer}>Add New Timer</button>
                <ul>
                    {timers.map((timer) => (
                        <li
                            key={timer.id}
                            style={{
                                cursor: 'pointer',
                                textDecoration: timer.isCompleted ? 'line-through' : 'none',
                                color: timer.isCompleted ? 'gray' : 'black',
                            }}
                            onClick={() => selectTimer(timer.id)}
                        >
                            {timer.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                {selectedTimer ? (
                    <CountdownTimer
                        timer={selectedTimer}
                        updateTimer={updateTimer}
                    />
                ) : (
                    <p>Select a timer to start or create a new one.</p>
                )}
            </div>
        </div>
    );
};

export default App;
