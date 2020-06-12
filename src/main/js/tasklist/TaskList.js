'use strict';

import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {Card, Header, List, Loader} from 'semantic-ui-react';

import TaskListDeleteButton from "./TaskListDeleteButton";
import CreateTask from "./CreateTask";
import Task from "../task/Task";
import axios from "../axios";

export default function TaskList(props) {
    const {taskList, onUpdateTask} = props;

    const onCreateTask = (title) => {
        const newTask = {
            "title": title,
            "description": "",
            "complete": false,
            "taskList": taskList._links.self.href
        };
        axios.post("/tasks", newTask)
            .then((response => {
            })).catch((e) => {
            console.log(e);
        });
    };

    const onDeleteTask = (task) => {
        axios.delete(task._links.self.href)
            .then((response) => {
            }).catch((e) => {
            console.log(e);
        });
    };

    const onDeleteTaskList = (taskList) => {
        axios.delete(taskList._links.self.href)
            .catch((e) => {
                console.log(e);
            });
    };

    if (!taskList) {
        return (
            <Loader active inline='centered'/>
        );
    }

    return (
        <Card>
            <List>
                <List.Header>
                    <TaskListDeleteButton onDeleteTaskList={onDeleteTaskList} taskList={taskList}/>
                    <Header as={"h2"} textAlign='center'>{taskList.name}</Header>
                </List.Header>

                <Droppable droppableId={taskList._links.self.href}>
                    {(provided) =>
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {taskList.tasks.map((task, index) => {
                                return (
                                    <List.Item key={task._links.self.href} style={{margin: "10px 10px"}}>
                                        <Task task={task} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask}
                                              index={index}/>
                                    </List.Item>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>

                <List.Item>
                    <CreateTask onCreateTask={onCreateTask}/>
                </List.Item>
            </List>
        </Card>
    );
}