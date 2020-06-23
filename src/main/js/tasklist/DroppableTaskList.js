import {Droppable} from "react-beautiful-dnd";
import React from "react";


export default function DroppableTaskList(props) {

    const { children, taskList } = props;

    return (
        <Droppable
            droppableId={taskList._links.self.href}
            type={"tasks"}
        >
            {(provided) =>
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {children}
                    {provided.placeholder}
                </div>
            }
        </Droppable>
    )
}