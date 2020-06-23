'use strict';

import React, { useState } from 'react';
import {List, Loader} from 'semantic-ui-react';

import CreateTask from "./CreateTask";
import Task from "../task/Task";
import axios from "../axios";
import DroppableTaskList from "./DroppableTaskList";
import DraggableTaskList from "./DraggableTaskList";

export default function TaskList(props) {
    const {
        taskList,
        onUpdateTask,
        updateListPositions,
        onUpdateTaskList,
        index,
        isMobile
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);

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
                updateListPositions(taskList);
            }).catch((e) => {
            console.log(e);
        });
    };

    if (!taskList) {
        return (
            <Loader active inline='centered'/>
        );
    }

    const getTasks = () => taskList.tasks.map((task, index) => {
        return (
            <List.Item key={task._links.self.href} style={{margin: "10px 10px"}}>
                <Task task={task} onDeleteTask={onDeleteTask}
                      onUpdateTask={onUpdateTask}
                      index={index}/>
            </List.Item>
        );
    });

    // if (isMobile) {
    //     return (
    //         <DraggableTaskList
    //             taskList={taskList}
    //             isMobile={isMobile}
    //             onUpdateTaskList={onUpdateTaskList}
    //             index={index}
    //         />
    //     );
    // }

    return (
        <DraggableTaskList
            taskList={taskList}
            isMobile={isMobile}
            onUpdateTaskList={onUpdateTaskList}
            index={index}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
        >
            {(isMobile && !isExpanded) ? null : (
                <div>
                    <DroppableTaskList taskList={taskList}>
                        {getTasks()}
                    </DroppableTaskList>
                    <List.Item>
                        <CreateTask onCreateTask={onCreateTask}/>
                    </List.Item>
                </div>
            )}
        </DraggableTaskList>
    );
}

// {(isMobile) ?
//     null : (
//         <div>
//             <DroppableTaskList taskList={taskList}>
//                 {getTasks()}
//             </DroppableTaskList>
//             <List.Item>
//                 <CreateTask onCreateTask={onCreateTask}/>
//             </List.Item>
//         </div>
//     )
// }