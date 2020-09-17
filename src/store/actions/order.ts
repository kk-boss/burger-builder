import ActionTypes, {MyAction} from "./actionTypes";
import {Dispatch} from "redux";
import axios from "../../axios-order";

const purchaseOrderSuccess = (id: string, orderData: any): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.PURCHASE_ORDER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}
const purchaseOrderFailed = (error: any): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.PURCHASE_ORDER_FAILED,
        payload: {
           error: error
        }
    }
}
const purchaseOrderStart = (): MyAction<ActionTypes> =>{
    return {
        type: ActionTypes.PURCHASE_ORDER_START,
        payload: {},
    };
}
export const purchaseOrder = (orderData: any)=>{
    return async(dispatch: Dispatch<MyAction<ActionTypes>>) => {
        dispatch(purchaseOrderStart());
        const response = await axios.post("orders.json", orderData);
        if (response){
            console.log(response.data);
        dispatch(purchaseOrderSuccess(response.data.name, orderData));
    }
        else{
            dispatch(purchaseOrderFailed(response))

        }
    }
}

export const purchaseOrderInit = (): MyAction<ActionTypes>=>{
    return {
        type: ActionTypes.PURCHASE_ORDER_INIT,
        payload: {}
    }
}

const fetchOrderSuccess = (orders: any): MyAction<ActionTypes> =>{
    return {
        type: ActionTypes.FETCH_ORDER_SUCCESS,
        payload: {
            orders: orders
        }
    }
}
const fetchOrderFail = (err: any): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.FETCH_ORDER_FAIL,
payload: {
            error: err
}
    }
}
const fetchOrderStart = (): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.FETCH_ORDER_START,
        payload: {}
    }
}

export const fetchOrders = () =>{
    return (dispatch: Dispatch<MyAction<ActionTypes>>) =>{
        dispatch(fetchOrderStart());
        axios.get('orders.json').then(
            (response)=>{
                const fetchedOrders = [];
                for(let key in response.data){
                    // noinspection JSUnfilteredForInLoop
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            }
        ).catch((err)=>{
            dispatch(fetchOrderFail(err));
        })
    }
}