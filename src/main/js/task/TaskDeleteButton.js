import React from "react";
import {Icon} from "semantic-ui-react";


export default function TaskDeleteButton(props) {
    const {task, onDeleteTask} = props;

    return (
        <div className={"ui right floated"} style={{margin: "-5px", marginLeft: "10px"}}>
            <Icon
                fitted
                size={"large"}
                name={"delete"}
                onClick={() => {onDeleteTask(task)}}
            />
        </div>
    )
}
