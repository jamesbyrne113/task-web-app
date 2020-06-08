'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import TaskList from './TaskList';

function App(props) {
    return (
        <div>
            <TaskList />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("react"));