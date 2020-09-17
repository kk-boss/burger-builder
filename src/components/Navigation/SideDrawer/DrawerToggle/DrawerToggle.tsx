import React from "react";
import classes from "./DrawerToggle.module.css";

interface propType{
    toggle: ()=>void
}
const drawerToggle = (props: propType) => (
    <div className={classes.DrawerToggle} onClick={props.toggle}>
    <div/>
    <div/>
    <div/>
    </div>
);

export default drawerToggle;