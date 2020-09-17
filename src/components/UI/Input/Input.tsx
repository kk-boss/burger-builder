import React from 'react';
import classes from "./Input.module.css";

interface propType {
    elementType: string;
    elementConfig: {
        [key: string]: any
    };
    value: string;
    changed: (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>void;
    invalid: boolean;
    shouldValidate: boolean;
    touched: boolean;
}
const input = (props: propType) => {
    let input: JSX.Element | null;
    const inputClasses = [classes.InputElement];
    if(props.shouldValidate && props.touched && props.invalid){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            input = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'textarea':
            input = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            input = (
                <select
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map((op: {value: string; displayValue: string})=>(
                        <option key={op.value} value={op.value}>
                            {op.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            input = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }
    return (
        <div className={classes.Input}>
            {/*<label className={classes.Label}>{props.label}</label>*/}
            {input}
        </div>
    );
}
export default input;