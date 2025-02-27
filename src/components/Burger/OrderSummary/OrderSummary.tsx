import React from "react";
import Button from "../../UI/Button/Button";

interface propType {
    ingredients: {
        [key: string]: number
    }
    continue: ()=>void;
    cancel: ()=>void;
    price: number;
}
const orderSummary = (props: propType) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
                </li>
            );
        })
    return (
        <>
          <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </>
    );
}
export default orderSummary;