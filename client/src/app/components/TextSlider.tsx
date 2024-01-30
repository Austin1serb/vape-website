import React, { useState, useEffect } from 'react';

const TextSlider = () => {
    const messages = ["New Year, New Gears", "Free US Shipping $85+", "Pod Pocket 7500: Buy One, Get One"];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % messages.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(timer);
    }, [messages.length]);

    const goPrev = () => setCurrent(current === 0 ? messages.length - 1 : current - 1);
    const goNext = () => setCurrent((current + 1) % messages.length);

    return (
        <div className="flex items-center justify-center space-x-4">
            <button onClick={goPrev} className="p-2">←</button>
            <div>{messages[current]}</div>
            <button onClick={goNext} className="p-2">→</button>
        </div>
    );
};

export default TextSlider;
