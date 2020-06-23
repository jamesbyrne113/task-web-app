import { useState, useEffect } from "react";

export default function useWindowWidth() {
    const getSize = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    const [windowSize, setWindowSize] = useState(getSize);

    const handleGetSize = () => {getSize()};

    useEffect(() => {
        window.addEventListener('resize', handleGetSize);
        window.removeEventListener('resize', handleGetSize)
    }, []);

    return windowSize;
}