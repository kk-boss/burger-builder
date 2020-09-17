import ActionTypes, {MyAction} from "../actions/actionTypes";
import authStateType from "../../interfaces/auth";
import {updateObject} from "../utility";

const initialState: authStateType = {
    error: null, loading: false, token: null, userId: null
}

const authStart = ( state: authStateType): authStateType => {
    return updateObject(state,{error: null, loading: true});
}
const authSuccess = ( state: authStateType, payload: {[key: string]: any}): authStateType => {
    return updateObject(state,{error: null, loading: false,token: payload.token, userId: payload.userId});
}
const authFail = ( state: authStateType, payload: {[key: string]: any}): authStateType => {
    return updateObject(state,{error: payload.error, loading: false});
}

const reducer = (state=initialState, action: MyAction<ActionTypes>): authStateType =>{
    switch (action.type) {
        case ActionTypes.AUTH_START: return authStart(state);
        case ActionTypes.AUTH_SUCCESS: return authSuccess(state,action.payload);
        case ActionTypes.AUTH_FAIL: return authFail(state,action.payload);
    }
    return state;
}

export default reducer;