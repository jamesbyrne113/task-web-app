'use strict';

import React, { useState } from "react";
import {Button, Card, Input, List} from "semantic-ui-react";

export default function CreateTaskList(props) {
    const [taskListName, setTaskListName] = useState("");

    const {onCreateTaskList} = props;

    return (
        <Input
            fluid
            action={
                <Button
                    onClick={() => {
                        onCreateTaskList(taskListName);
                        setTaskListName("");
                    }}
                    disabled={taskListName === ""}
                >Create</Button>
            }
            placeholder={"Create New List..."}
            value={taskListName}
            onChange={(e) => {
                setTaskListName(e.target.value)
            }}
            style={{ marginBottom: "10px" }}
        />
    )

    // return (
    //     <List.Item>
    //         <Card>
    //             <Input
    //                 fluid
    //                 action={
    //                     <Button
    //                         onClick={() => {
    //                             onCreateTaskList(taskListName);
    //                             setTaskListName("");
    //                         }}
    //                         disabled={taskListName === ""}
    //                     >Create</Button>
    //                 }
    //                 placeholder={"Create New List..."}
    //                 value={taskListName}
    //                 onChange={(e) => {
    //                     setTaskListName(e.target.value)
    //                 }}
    //             />
    //         </Card>
    //     </List.Item>
    // )
}