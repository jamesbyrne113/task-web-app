'use strict';

import React, {useEffect, useState} from 'react';

import CreateTaskList from "./CreateTaskList";
import TaskList from "../tasklist/TaskList";
import axios from "../axios";
import {List, Loader} from "semantic-ui-react";

import fetchBoardGenerator from "./fetch-data";
import DragDropBoard from "./DragDropBoard";

const stompClient = require('../websocket-listener');


export default function Board(props) {
    const {isMobile} = props;

    const [board, setBoard] = useState(null);
    const [taskLists, setTaskLists] = useState([]);
    const [taskListsLinks, setTaskListsLinks] = useState(null);

    const fetchBoard = fetchBoardGenerator(setBoard, setTaskLists, setTaskListsLinks);

    useEffect(() => {
        fetchBoard();
        stompClient.register([
            {route: '/topic/newTask', callback: fetchBoard},
            {route: '/topic/deleteTask', callback: fetchBoard},
            {route: '/topic/updateTask', callback: fetchBoard},
            {route: '/topic/newTaskList', callback: fetchBoard},
            {route: '/topic/deleteTaskList', callback: fetchBoard},
            {route: '/topic/updateTaskList', callback: fetchBoard}
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

    const onUpdateTaskList = (taskList) => {
        axios.put(
            taskList._links.self.href,
            taskList,
            {
                'If-Match': taskList.Etag
            }
        ).catch(e => {
            console.log(e);
        })
    }

    const updateListPositions = (list, updateItem, targetItem) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].taskListPosition === i && list[i] !== targetItem)
                continue;

            list[i].taskListPosition = i;
            updateItem(list[i]);
        }
    }

    const getDesktopListItems = () => {
        return taskLists.map((taskList, index) => {
            return (
                <List.Item key={taskList._links.self.href}>
                    <TaskList
                        taskList={taskList}
                        index={index}
                        onUpdateTask={onUpdateTask}
                        isMobile={isMobile}
                        onUpdateTaskList={onUpdateTaskList}
                        updateListPositions={updateListPositions}
                    />
                </List.Item>
            );
        });
    }

    const getMobileListItems = () => {
        return taskLists.map((taskList, index) => {
            return (
                <List.Item key={taskList._links.self.href}>
                    <TaskList
                        taskList={taskList}
                        index={index}
                        onUpdateTask={onUpdateTask}
                        isMobile={isMobile}
                        onUpdateTaskList={onUpdateTaskList}
                        updateListPositions={updateListPositions}
                    />
                </List.Item>
            );
        });
    }

    if (!board || !board.taskLists) {
        return <Loader />
    }

    return (
        <div>
            <CreateTaskList onCreateTaskList={onCreateTaskList}/>
            <DragDropBoard
                taskLists={taskLists}
                onUpdateTask={onUpdateTask}
                onUpdateTaskList={onUpdateTaskList}
                updateListPositions={updateListPositions}
                isMobile={isMobile}
            >
                {(isMobile) ? getMobileListItems() : getDesktopListItems()}
            </DragDropBoard>
        </div>
    );

    // return (
    //     <DragDropContext
    //         onDragEnd={onDragEnd}
    //     >
    //         <Droppable
    //             droppableId={"taskLists"}
    //             direction={"horizontal"}
    //             type="taskList"
    //         >
    //             {(provided) =>
    //                 <div
    //                     ref={provided.innerRef}
    //                     {...provided.droppableProps}
    //                     style={{display: "flex"}}
    //                 >
    //                     {<DesktopList
    //                         provided={provided}
    //                         taskLists={taskLists}
    //                         onUpdateTask={onUpdateTask}
    //                         onUpdateTaskList={onUpdateTaskList}
    //                         updateListPositions={updateListPositions}
    //                         isMobile={isMobile}
    //                     />}
    //                     <CreateTaskList onCreateTaskList={onCreateTaskList}/>
    //                 </div>
    //             }
    //         </Droppable>
    //     </DragDropContext>
    // )
}

// function MobileList(props) {
//     const {
//         taskLists,
//         onUpdateTask,
//         updateListPositions,
//         onUpdateTaskList,
//         isMobile
//     } = props;
//
//     const accordions = taskLists.map((taskList, index) => {
//         return {
//             key: index,
//             title: { content: taskList.name},
//             content: { content: <TaskList
//                     taskList={taskList}
//                     onUpdateTask={onUpdateTask}
//                     onUpdateTaskList={onUpdateTaskList}
//                     updateListPositions={updateListPositions}
//                     index={index}
//                     isMobile={isMobile}
//                 />
//             }
//         }
//     })
//
//     return <Accordion defaultActiveIndex={1} panels={accordions} />
// }

