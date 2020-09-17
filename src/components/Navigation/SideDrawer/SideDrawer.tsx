import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";

interface propType {
    show: boolean;
    closed: ()=>void;
}
const sideDrawer = (props: propType) =>{
    const assignedClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        assignedClasses[1] = classes.Open;
    }
return (
    <>
        <Backdrop show={props.show} dismiss={props.closed} />
    <div className={assignedClasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </div>
        </>
);
}

export default sideDrawer;