import ActionTypes, {MyAction} from "../actions/actionTypes";
import burgerStateType from "../../interfaces/burgerbuilder";

const INGREDIENTS_PRICE: { [key: string]: number } = {
    salad: 0.3,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1.5
}

const initialState: burgerStateType = {
    ingredients: {},
    totalPrice: 4,
    error: false
}

const reducer = (state = initialState, action: MyAction<ActionTypes>) => {
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.ingredientName]
            }
        case ActionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.ingredientName]
            }
        case ActionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                error: false,
                totalPrice: 4
            }
        case ActionTypes.SET_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    }
    return state;
}

export default reducer;