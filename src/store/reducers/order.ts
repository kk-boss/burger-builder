import ActionTypes, {MyAction} from "../actions/actionTypes";
import orderStateType from "../../interfaces/order";

const initialState: orderStateType = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action: MyAction<ActionTypes>): orderStateType => {
    switch (action.type) {
        case ActionTypes.PURCHASE_ORDER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case ActionTypes.PURCHASE_ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        case ActionTypes.PURCHASE_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.PURCHASE_ORDER_INIT:
            return {
                ...state,
                purchased: false
            }
        case ActionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case ActionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
                loading: false
            }

    }
    return state;
}

export default reducer;