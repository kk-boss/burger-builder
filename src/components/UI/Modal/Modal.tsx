import React, {Component} from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from './Modal.module.css';

interface propType {
    children: React.ReactNode,
    show: boolean,
    modalClosed: ()=>void
}
class Modal extends Component<propType>{
    shouldComponentUpdate(nextProps: Readonly<propType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} dismiss={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;