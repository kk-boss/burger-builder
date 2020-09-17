import ActionTypes, {MyAction} from "./actionTypes";
import axios from 'axios';
import {Dispatch} from "redux";

const authStart = (): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.AUTH_START,
        payload: {}
    }
}
const authSuccess = (token: any, localId: any): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        payload: {
          token: token,
            userId: localId
        }
    }
}
const authFail = (err: any): MyAction<ActionTypes> => {
    return {
        type: ActionTypes.AUTH_FAIL,
        payload: {
            error: err
        }
    }
}

export const auth = (email: string, password: string, isSignUp: boolean) => {
    return (dispatch: Dispatch<MyAction<ActionTypes>>) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnuL9WEH9m7qpYNShSFNcKxq2SjO3bXNQ";
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnuL9WEH9m7qpYNShSFNcKxq2SjO3bXNQ"
        }
        axios.post(url,authData).then((response)=>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        }).catch((err)=>{
            console.log(err);
            dispatch(authFail(err));
        })
    }
}
