import React from 'react';

import classes from './Backdrop.module.css';
interface propType {
    show: boolean,
    dismiss: ()=>void
}
const backdrop = (props: propType) => (
    props.show ? <div className={classes.Backdrop} onClick={props.dismiss}/> : null
);

export default backdrop;