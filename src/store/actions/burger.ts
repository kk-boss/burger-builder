import ActionTypes, {MyAction} from "./actionTypes";
import {Dispatch} from "redux";
import axios from "../../axios-order";

export const add_ingredient = (ingName: string): MyAction<ActionTypes> => {
    return {type: ActionTypes.ADD_INGREDIENT, payload: {ingredientName: ingName}}
}
export const remove_ingredient = (ingName: string): MyAction<ActionTypes> => {
    return {type: ActionTypes.REMOVE_INGREDIENT, payload: {ingredientName: ingName}}
}

const setIngredients = (ingredients: any): MyAction<ActionTypes> =>{
    return {
        type: ActionTypes.SET_INGREDIENTS,
       payload: { ingredients: ingredients}
    }
}

const setIngredientsFailed = (): MyAction<ActionTypes> =>{
    return {
        type: ActionTypes.SET_INGREDIENTS_FAILED,
        payload: {}
    }
}

export const initIngredients = () => {
    return async(dispatch: Dispatch<MyAction<ActionTypes>>) => {
            const response = await axios.get("ingredients.json");
            if (response)
                dispatch(setIngredients(response.data));
            else
               dispatch(setIngredientsFailed());
    }
}