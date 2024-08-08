import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';

const App = () => {
    const [timers, setTimers] = useState([]);
    const [timerCount, setTimerCount] = useState(0);
    const [selectedTimerId, setSelectedTimerId] = useState(null);

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
        const updatedTimers = timers.map(timer => 
            timer.id === id ? { ...timer, ...updatedTimer } : timer
        );
        setTimers(updatedTimers);
    };

    const selectTimer = (id) => {
        setSelectedTimerId(id);
    };

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
                                textDecoration: timer.isCompleted ? 'line-through' : 'none' 
                            }}
                            onClick={() => selectTimer(timer.id)}
                        >
                            {timer.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                {selectedTimerId !== null ? (
                    <CountdownTimer
                        timer={timers.find(timer => timer.id === selectedTimerId)}
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
