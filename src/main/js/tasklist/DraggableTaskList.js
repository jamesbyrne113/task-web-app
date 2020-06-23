import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {Card, List} from "semantic-ui-react";
import TaskListHeader from "./TaskListHeader";

export default function DraggableTaskList(props) {
    const { children, taskList, isMobile, onUpdateTaskList, index, isExpanded, setIsExpanded } = props;

    return (
        <Draggable
            draggableId={taskList._links.self.href}
            index={index}
        >
            {(provided) =>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Card fluid={isMobile}>
                        <List>
                            <TaskListHeader
                                taskList={taskList}
                                dragHandleProps={provided.dragHandleProps}
                                onUpdateTaskList={onUpdateTaskList}
                                isMobile={isMobile}
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                            />
                            {children}
                        </List>
                    </Card>
                </div>
            }
        </Draggable>
    );
}