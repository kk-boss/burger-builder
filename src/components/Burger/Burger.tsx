import React from "react";

import classes from './Burger.module.css';

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

interface propType {
    ingredients: {
        [key: string]: number
    }
}
const burger = (props: propType)=>{
    let transformedIngredients = Object.keys(props.ingredients).map((igKey)=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce((acc,curr)=>acc.concat(curr),[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = [<p key='hello'>Please start adding ingredients</p>];
    }
    return (
        <div className = {classes.Burger}>
    <BurgerIngredient type="bread-top" />
            {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default burger;