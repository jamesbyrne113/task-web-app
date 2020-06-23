'use strict';
import {Button, Header, Input, List} from "semantic-ui-react";
import TaskListDeleteButton from "./TaskListDeleteButton";
import React, {useState} from "react";
import axios from "../axios";

export default function TaskListHeader(props) {
    const { isMobile } = props;

    if (isMobile)
        return (<MobileTaskListHeader {...props} />);
    else
        return (<DesktopTaskListHeader {...props} />);
}

function DesktopTaskListHeader(props) {
    const { dragHandleProps, taskList } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskListName, setTaskListName] = useState(taskList.name);

    const onUpdateTaskListName = (taskList, newName) => {
        taskList.name = newName;
        axios.patch(
            taskList._links.self.href,
            { name: newName },
            {
                'If-Match': taskList.Etag
            }
        ).then(response => {
            setIsEditMode(false);
        }).catch(e => {
            console.log(e);
        })
    }

    if (!isEditMode) {
        return (
            <List.Header
                onClick={(e) => {setIsEditMode(true)}}
                {...dragHandleProps}
                style={{marginLeft: "10px", marginRight: "10px"}}
            >
                <TaskListDeleteButton taskList={taskList}/>
                <Header as={"h2"}>{taskList.name}</Header>
            </List.Header>
        );
    }

    return (
        <List.Header {...dragHandleProps} style={{marginLeft: "10px", marginRight: "10px"}}>
            <Input
                fluid
                action={
                    <Button
                        onClick={() => { onUpdateTaskListName(taskList, taskListName); }}
                        disabled={taskListName === ""}
                    >Update</Button>
                }
                placeholder={"Create New Task"}
                value={taskListName}
                onChange={(e) => {setTaskListName(e.target.value)}}
            />
        </List.Header>
    );
}

function MobileTaskListHeader(props) {
    const { dragHandleProps, taskList, setIsExpanded, isExpanded } = props;

    return (
        <List.Header
            onClick={(e) => {setIsExpanded(!isExpanded)}}
            {...dragHandleProps}
            style={{marginLeft: "10px", marginRight: "10px"}}
        >
            <TaskListDeleteButton taskList={taskList}/>
            <Header as={"h2"}>{taskList.name}</Header>
        </List.Header>
    )
}