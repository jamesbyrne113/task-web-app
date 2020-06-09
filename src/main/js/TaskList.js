'use strict';

import React, { useState, useEffect } from 'react';
import {Button, Card, Input, List, Loader, Header} from 'semantic-ui-react'
import promise from 'promise';

import Task from "./Task";
import axios from "./axios";

const stompClient = require('./websocket-listener');

export default function TaskList(props) {

    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
        axios.get(props._embedded._links.tasks.href)
            .then(response => {
                debugger;
                return promise.all(response.data._embedded.tasks.map(task =>
                    axios.get(task._links.self.href)
                ));
            }).then(responses => {
                setTasks(responses.map(response => {
                    const task = response.data;
                    task.etag = response.headers.etag;
                    return task;
                }));
            }).catch(e => {
                console.log(e);
        });
    }

    useEffect(() => {
        getTasks();
        stompClient.register([
            {route: '/topic/newTask', callback: getTasks},
            {route: '/topic/updateTask', callback: getTasks},
            {route: '/topic/deleteTask', callback: getTasks}
        ]);
    }, []);

    const createNewTask = (title) => {
        const newTask = {
            "title": title,
            "description": "",
            "complete": false
        };
        axios.post("/tasks", newTask)
            .then((response => {
                // getTasks();
            })).catch((e) => {
                console.log(e);
            });
    };

    const updateTask = (oldTask, newTask) => {
        axios.put(
            oldTask._links.self.href,
            newTask,
            {
                'If-Match': oldTask.Etag
            }
        ).then(response => {
            getTasks();
        }).catch(e => {
            console.log(e);
        })
    }

    const deleteTask = (task) => {
        axios.delete(task._links.self.href)
            .then((response) => {
                // getTasks();
            }).catch((e) => {
                console.log(e);
            });
    };

    if (tasks === []) {
        return (
            <Loader active inline='centered' />
        );
    }

    const listItems = tasks.map(task =>
        <List.Item key={task._links.self.href}>
            <Task task={task} deleteTask={deleteTask} updateTask={updateTask} />
        </List.Item>
    );

    return (
        <Card>
            <List>
                <List.Header>
                    <Header as={"h2"} textAlign='center'>{props.name}</Header>
                </List.Header>
                {listItems}
                <List.Item>
                    <CreateNewTask createNewTask={createNewTask}/>
                </List.Item>
            </List>
        </Card>
    );
}

function CreateNewTask(props) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    return (
        <Input
            fluid
            action={
                <Button
                    onClick={() => {
                        props.createNewTask(newTaskTitle);
                        setNewTaskTitle("");
                    }}
                    disabled={newTaskTitle === ""}
                >Create</Button>
            }
            value={newTaskTitle}
            onChange={(e) => {setNewTaskTitle(e.target.value)}}
        />
    )
}