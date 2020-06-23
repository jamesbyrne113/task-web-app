'use strict';

import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import {Card, CardContent} from "semantic-ui-react";

import TaskCompleteToggle from "./TaskCompleteToggle";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskEditButton from "./TaskEditButton";
import UpdateTask from "./UpdateTask";

export default function Task(props) {
    const { task, onUpdateTask, onDeleteTask, index } = props;

    return (
        <Draggable draggableId={task._links.self.href} index={index}>
            {(provided) =>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card fluid>
                        <CardContent>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <TaskCompleteToggle task={task} onUpdateTask={onUpdateTask} />
                                <div style={{flex: 1}}>
                                    <TaskDeleteButton onDeleteTask={onDeleteTask} task={task} />
                                    <UpdateTask task={task} />
                                    <Card.Header>{task.title}</Card.Header>
                                    <Card.Description>{task.description}</Card.Description>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            }
        </Draggable>
    )
}
