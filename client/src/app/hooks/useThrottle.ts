import { useCallback, useRef } from 'react';

// Define the type for the callback function
type CallbackFunction = (...args: any[]) => void;

const useThrottle = (callback: CallbackFunction, delay: number): CallbackFunction => {
    const lastCall = useRef<number | null>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const throttledFunction: CallbackFunction = useCallback((...args: any[]) => {
        const now = Date.now();
        if (lastCall.current !== null && now < lastCall.current + delay) {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                lastCall.current = now;
                callback(...args);
            }, delay + lastCall.current - now);
        } else {
            lastCall.current = now;
            callback(...args);
        }
    }, [callback, delay]);

    return throttledFunction;
};

export default useThrottle;
