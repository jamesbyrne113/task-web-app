'use strict';

import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import promise from 'promise';

import CreateTaskList from "./CreateTaskList";
import TaskList from "../tasklist/TaskList";
import axios from "../axios";
import {List, Loader} from "semantic-ui-react";

const stompClient = require('../websocket-listener');


export default function Board(props) {
    const [taskLists, setTaskLists] = useState([]);
    const [taskListsLinks, setTaskListsLinks] = useState(null);

    const getTasks = taskList => {
        return axios.get(taskList._links.tasks.href)
            .then(response => {
                return promise.all(response.data._embedded.tasks.map(task =>
                    axios.get(task._links.self.href)
                ));
            }).then(responses => {
                return responses.map(response => {
                    const task = response.data;
                    task.etag = response.headers.etag;
                    return task;
                });
            }).catch(e => {
                console.log(e);
            });
    };

    const getTaskLists = () => {
        axios.get("/taskLists")
            .then(response => {
                setTaskListsLinks(response.data._links);
                return promise.all(response.data._embedded.taskLists.map(taskList =>
                    axios.get(taskList._links.self.href)
                ));
            }).then(responses => {
            const responseTaskLists = responses.map(response => {
                const taskList = response.data;
                taskList.etag = response.headers.etag;
                taskList.tasks = [];
                return taskList;
            });
            setTaskLists(responseTaskLists);
            return responseTaskLists;
        }).then(responseTaskLists => {
            return promise.all(responseTaskLists.map(taskList => {
                return getTasks(taskList)
                    .then(tasks => {
                        taskList.tasks = tasks;
                        return taskList;
                    });
            }));
        }).then(taskListsAndTasks => {
            setTaskLists(taskListsAndTasks);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        getTaskLists();
        stompClient.register([
            {route: '/topic/newTask', callback: getTaskLists},
            {route: '/topic/updateTask', callback: getTaskLists},
            {route: '/topic/onDeleteTask', callback: getTaskLists},
            {route: '/topic/newTaskList', callback: getTaskLists},
            {route: '/topic/deleteTaskList', callback: getTaskLists}
        ]);
    }, [])

    const onUpdateTask = (task) => {
        axios.put(
            task._links.self.href,
            task,
            {
                'If-Match': task.Etag
            }
        ).catch(e => {
            console.log(e);
        })
    }

    const updateTaskListPositions = (taskList, targetTask) => {
        for (let i = 0; i < taskList.tasks.length; i++) {
            if (taskList.tasks[i].taskListPosition === i && taskList.tasks[i] !== targetTask)
                continue;

            taskList.tasks[i].taskListPosition = i;
            onUpdateTask(taskList.tasks[i]);
        }
    }

    const onCreateTaskList = (name) => {
        axios.post(
            taskListsLinks.self.href,
            {
                name: name
            }
        ).catch(e => {
            console.log(e);
        });
    }

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination)
            return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        if (destination.droppableId === source.droppableId) {
            const targetTaskList = taskLists.filter(taskList => taskList._links.self.href === destination.droppableId)[0];
            const targetTask = targetTaskList.tasks.splice(source.index, 1)[0];
            targetTaskList.tasks.splice(destination.index, 0, targetTask);
            updateTaskListPositions(targetTaskList);
            return;
        }

        const sourceTaskList = taskLists.filter(taskList => taskList._links.self.href === source.droppableId)[0];
        const destinationTaskList = taskLists.filter(taskList => taskList._links.self.href === destination.droppableId)[0];

        const targetTask = sourceTaskList.tasks.splice(source.index, 1)[0];
        destinationTaskList.tasks.splice(destination.index, 0, targetTask);

        targetTask.taskList = destination.droppableId;
        axios.delete(targetTask._links.self.href);

        updateTaskListPositions(sourceTaskList, null);
        updateTaskListPositions(destinationTaskList, targetTask);
    };

    if (!taskLists) {
        return (
            <Loader active inline='centered'/>
        )
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <List horizontal>
                {taskLists.map(taskList => {
                    return (
                        <List.Item key={taskList._links.self.href}>
                            <TaskList taskList={taskList} onUpdateTask={onUpdateTask}/>
                        </List.Item>
                    );
                })}
                <CreateTaskList onCreateTaskList={onCreateTaskList}/>
            </List>
        </DragDropContext>
    )
}

