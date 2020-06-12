import React, { useState } from "react";
import {Button, Input} from "semantic-ui-react";

export default function CreateTask(props) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const { onCreateTask } = props;

    return (
        <Input
            fluid
            action={
                <Button
                    onClick={() => {
                        onCreateTask(newTaskTitle);
                        setNewTaskTitle("");
                    }}
                    disabled={newTaskTitle === ""}
                >Create</Button>
            }
            placeholder={"Create New Task"}
            value={newTaskTitle}
            onChange={(e) => {setNewTaskTitle(e.target.value)}}
        />
    )
}