import React , { Component } from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios-order';
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import reducerType from "../../interfaces/reducer";
import {fetchOrders} from "../../store/actions";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router-dom";

type propType = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class Orders extends Component<propType, any>{
     componentDidMount() {
         this.props.onFetchOrders();
    }

    render() {
        return (
            <div>
                {
                    this.props.orders.map(((order: any)=>{
                        return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                    }))
                }
            </div>
        );
    }
}

const mapStateToProps = (state: reducerType) =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch: any) =>{
    return {
        onFetchOrders: ()=>dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));