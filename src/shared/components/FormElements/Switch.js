import React, { useState } from "react";

import './Switch.css';

const Switch = props => {
    const switchValue = props.value;
    const [checked, setChecked] = useState(switchValue);

    const switchChangeHandler = event => {
        let isChecked = checked;
        if (isChecked) {
            setChecked(false);
            isChecked = false;
        } else {
            setChecked(true);
            isChecked = true;
        }
        props.onInput(props.id, isChecked, true);
      };

    return (
        <div className="form-control switch">
        <label htmlFor={props.HtmlFor || props.id} className="label-success">{props.label}</label>
            <div className="button-switch">
                <input id={props.HtmlFor || props.id} type="checkbox" checked={checked} onChange={switchChangeHandler}/>
                <label htmlFor={props.HtmlFor || props.id} className="label-success"></label>
            </div>
        </div>
    );
}

export default Switch;