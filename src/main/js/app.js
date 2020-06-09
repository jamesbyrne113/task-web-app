'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import TaskLists from './TaskLists';

function App(props) {
    return (
        <div>
            <TaskLists />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("react"));