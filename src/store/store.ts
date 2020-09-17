import { createStore, applyMiddleware, compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./reducers/burger";
import orderReducer from "./reducers/order";
import reducerType from "../interfaces/reducer";
import authReducer from "./reducers/auth";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers<reducerType>({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
export default store;