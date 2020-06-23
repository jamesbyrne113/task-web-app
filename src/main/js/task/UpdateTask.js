'use strict';

import { Button, Form, Input, Modal, TextArea} from "semantic-ui-react";
import React, { useState } from "react";
import TaskEditButton from "./TaskEditButton";

import axios from "../axios";


export default function UpdateTask(props) {
    const { task } = props;

    const [displayModal, setDisplayModal] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);


    const onSubmit = () => {
        axios.patch(
            task._links.self.href,
            {
                title: title,
                description: description,
            },
            {
                'If-Match': task.Etag
            }
        ).then(response => {
            setDisplayModal(false);
        }).catch(e => { console.log(e); })
    }

    return (
        <Modal
            trigger={<TaskEditButton onClick={(e) => setDisplayModal(true)}/>}
            open={displayModal}
            onClose={(e) => setDisplayModal(false)}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    style={{ marginBottom: "10px" }}
                />
                <Form>
                    <TextArea
                        value={description}
                        style={{ minHeight: 100 }}
                        onChange={(e) => {setDescription(e.target.value)}}
                        style={{ marginBottom: "10px" }}
                    />
                </Form>
                <Button
                    content="Update"
                    onClick={() => {
                        onSubmit();
                    }}
                />
            </Modal.Content>
        </Modal>
    );
}