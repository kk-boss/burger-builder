import React from "react";
import classes from "./NavigationItem.module.css";
import {NavLink} from 'react-router-dom';

interface propType {
    link: string;
    children: React.ReactNode
}
const navigationItem = (props: propType) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} activeClassName={classes.active} exact >{props.children}</NavLink>
    </li>
);

export default navigationItem;