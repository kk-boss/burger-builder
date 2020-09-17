import React from 'react';
import classes from './Order.module.css';

interface propType {
    ingredients: {
        [key: string]: any
    },
    price: number
}

const order = (props: propType) => {
    const ingredients = [];
    for (let ingredientsKey in props.ingredients) {
        ingredients.push({
            name: ingredientsKey,
            amount: props.ingredients[ingredientsKey]
        })
    }
    const ingredientOutput = ingredients.map((ig => {
        return (<span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >
            {ig.name} ({ig.amount})
        </span>);
    }))
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;