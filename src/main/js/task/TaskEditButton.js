import React from "react";
import {Icon} from "semantic-ui-react";

export default function TaskEditButton(props) {
    return (
        <div className={"ui right floated"}>
            <Icon
                size={"large"}
                name={'edit'}
                onClick={() => {
                }}
            />
        </div>
    );
}