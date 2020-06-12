'use strict';

import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function TaskListDeleteButton(props) {
    const { taskList, onDeleteTaskList } = props;

    return (
        <div className={"ui right floated"}>
            <Icon
                size={"large"}
                name={"delete"}
                onClick={() => {onDeleteTaskList(taskList)}}
            />
        </div>
    );
}