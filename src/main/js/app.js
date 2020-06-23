'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Board from './board/Board';

function App(props) {
    const [isMobile, setIsMobile] = useState(undefined);

    const resize = () => {
        let currentIsMobile = (window.innerWidth <= 760);
        if (currentIsMobile !== isMobile) {
            setIsMobile(currentIsMobile);
        }
    }

    useEffect(() => {
        resize();
        window.addEventListener("resize", () => {resize()});
    }, []);

    return (
        <div style={{padding: "24px", backgroundColor: '#348BC3', height: "100vh"}}>
            <Board isMobile={isMobile}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("react"));