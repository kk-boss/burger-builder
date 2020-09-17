import burgerStateType from "./burgerbuilder";
import orderStateType from "./order";
import authStateType from "./auth";

interface reducerType {
    burgerBuilder: burgerStateType;
    order: orderStateType;
    auth: authStateType
}

export default reducerType;