import React from "react";
import classes from './Button.module.css';

interface propType {
    btnType: string;
    children: React.ReactNode;
    clicked?: (event: React.MouseEvent)=>void;
    disabled?: boolean;
}
const button = (props: propType)=>{
return <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
}

export default button;