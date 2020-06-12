import React from "react";
import {Icon} from "semantic-ui-react";

export default function TaskCompleteToggle(props) {
    const { task, onUpdateTask } = props;

    return (
        <div>
            <Icon
                size={"large"}
                color={(task.complete) ? 'green' : 'grey'}
                name={(task.complete) ? 'check circle' : 'circle outline'}
                onClick={() => {
                    const newTask = JSON.parse(JSON.stringify(task)); // copying object
                    newTask.complete = !newTask.complete;
                    onUpdateTask(task, newTask)
                }}
            />
        </div>
    )
}