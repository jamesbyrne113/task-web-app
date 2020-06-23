import React from "react";
import {Icon} from "semantic-ui-react";

export default function TaskEditButton(props) {
    return (
        <div className={"right floated"} style={{margin: "-5px"}} {...props}>
            <Icon
                fitted
                size={"large"}
                name={"edit"}
            />
        </div>
    );
}