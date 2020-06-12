'use strict';

import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import {Card, CardContent} from "semantic-ui-react";

import TaskCompleteToggle from "./TaskCompleteToggle";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskEditButton from "./TaskEditButton";

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
                    <Card>
                        <CardContent>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <TaskCompleteToggle task={task} onUpdateTask={onUpdateTask} />
                                <div style={{flex: 1}}>
                                    <TaskDeleteButton onDeleteTask={onDeleteTask} task={task} />
                                    <TaskEditButton />
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
