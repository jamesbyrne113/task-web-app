import React from "react";
import {Icon} from "semantic-ui-react";


export default function TaskDeleteButton(props) {
    const {task, onDeleteTask} = props;

    return (
        <div className={"ui right floated"}>
            <Icon
                size={"large"}
                name={"delete"}
                onClick={() => {onDeleteTask(task)}}
            />
        </div>
    )
}
