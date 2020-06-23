'use strict';

import React from 'react';
import { Icon } from 'semantic-ui-react';

const onDeleteTaskList = (taskList) => {
    axios.delete(taskList._links.self.href)
        .catch((e) => {
            console.log(e);
        });
}

export default function TaskListDeleteButton(props) {
    const { taskList } = props;

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