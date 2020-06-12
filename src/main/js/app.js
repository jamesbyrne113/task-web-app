'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board/Board';

function App(props) {
    return (
        <div>
            <Board />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("react"));