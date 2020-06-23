import {DragDropContext, Droppable} from "react-beautiful-dnd";
import React from "react";
import {List} from "semantic-ui-react";
import axios from "../axios";

export default function DragDropBoard(props) {
    const { children, isMobile, taskLists, onUpdateTask, onUpdateTaskList, updateListPositions } = props;

    const onDragEnd = (result) => {
        const {destination, source, type} = result;

        if (!destination)
            return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        if (type === "taskList") {
            const targetTaskList = taskLists.splice(source.index, 1)[0];
            taskLists.splice(destination.index, 0, targetTaskList);
            updateListPositions(taskLists, onUpdateTaskList);
            return;
        }

        if (destination.droppableId === source.droppableId) {
            const targetTaskList = taskLists.filter(taskList => taskList._links.self.href === destination.droppableId)[0];
            const targetTask = targetTaskList.tasks.splice(source.index, 1)[0];
            targetTaskList.tasks.splice(destination.index, 0, targetTask);
            updateListPositions(targetTaskList.tasks, onUpdateTask);
            return;
        }

        const sourceTaskList = taskLists.filter(taskList => taskList._links.self.href === source.droppableId)[0];
        const destinationTaskList = taskLists.filter(taskList => taskList._links.self.href === destination.droppableId)[0];

        const targetTask = sourceTaskList.tasks.splice(source.index, 1)[0];
        destinationTaskList.tasks.splice(destination.index, 0, targetTask);

        targetTask.taskList = destination.droppableId;
        axios.delete(targetTask._links.self.href);

        updateListPositions(sourceTaskList.tasks, onUpdateTask, null);
        updateListPositions(destinationTaskList.tasks, onUpdateTask, targetTask);
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable
                droppableId={"taskLists"}
                direction={"horizontal"}
                type="taskList"
            >
                {(provided) =>
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{display: "flex"}}
                    >
                        <List
                            horizontal={!isMobile}
                            style={{flex: 1}}
                        >
                            {children}
                            {provided.placeholder}
                        </List>
                    </div>
                }
            </Droppable>
        </DragDropContext>
    )
}

