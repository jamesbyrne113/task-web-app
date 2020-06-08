'use strict';

import React, { useState } from "react";
import {Button, Card, CardContent, Icon, Label, List} from "semantic-ui-react";

export default function Task(props) {
    // const [completed, setCompleted] = useState(props.task.complete);

    return (
        <Card>
            <CardContent>
                <div style={{display: "flex", alignItems: "center"}}>
                    <TaskCompleteToggle task={props.task} updateTask={props.updateTask} />
                    <div style={{flex: 1}}>
                        <TaskDeleteButton deleteTask={props.deleteTask} task={props.task} />
                        <TaskEditButton />
                        <Card.Header>{props.task.title}</Card.Header>
                        <Card.Description>{props.task.description}</Card.Description>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function TaskDeleteButton(props) {
    const {task, deleteTask} = props;

    return (
        <div className={"ui right floated"}>
            <Icon
                size={"large"}
                name={"delete"}
                onClick={() => {deleteTask(task)}}
            />
        </div>
    )
}

function TaskEditButton(props) {
    return (
        <div className={"ui right floated"}>
            <Icon
                size={"large"}
                name={'edit'}
                onClick={() => {
                }}
            />
        </div>
    );
}

function TaskCompleteToggle(props) {
    const {task, updateTask} = props;

    return (
        <div>
            <Icon
                size={"large"}
                color={(task.complete) ? 'green' : 'grey'}
                name={(task.complete) ? 'check circle' : 'circle outline'}
                onClick={() => {
                    const newTask = JSON.parse(JSON.stringify(task)); // copying object
                    newTask.complete = !newTask.complete;
                    updateTask(task, newTask)
                }}
            />
        </div>
    )
}