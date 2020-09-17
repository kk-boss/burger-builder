import React, {Component} from 'react';
import Toolbar from "../Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

interface propType {
    children: React.ReactNode
}
interface stateType {
    showSideDrawer: boolean
}
class Layout extends Component<propType, stateType>{
    state: stateType = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <>
                <Toolbar toggle={this.sideDrawerToggleHandler} />
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;