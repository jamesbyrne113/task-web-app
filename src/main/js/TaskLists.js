'use strict';

import React, { useState, useEffect } from 'react';
import promise from 'promise';

import TaskList from "./TaskList";
import axios from "./axios";
import {List} from "semantic-ui-react";

export default function TaskLists(props) {
    const [taskLists, setTaskLists] = useState([]);

    const getTaskLists = () => {
        debugger;
        axios.get("/taskLists")
            .then(response => {
                debugger;
                return promise.all(response.data._embedded.tasks.map(taskList =>
                    axios.get(taskList._links.self.href)
                ));
            }).then(responses => {
                debugger;
                setTaskLists(responses.map(response => {
                    const taskList = response.data;
                    taskList.etag = response.headers.etag;
                    return taskList;
                }));
            }).catch(e => {
                debugger;
                console.log(e);
            });
    }

    useEffect(() => {
        getTaskLists();
    })


    const taskListElements = taskLists.map(taskList => {
        debugger;
        return (
            <List.Item>
                <TaskList taskList={taskList}/>
            </List.Item>
        );
    });

    return (
        <List horizontal>

        </List>
    )
}

