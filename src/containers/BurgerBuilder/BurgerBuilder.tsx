import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
// import axios from "../../axios-order";
import instance from "../../axios-order";
import {RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ActionTypes, {MyAction} from "../../store/actions/actionTypes";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import reducerType from "../../interfaces/reducer";

type propType = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface stateType {
    purchasing: boolean;
    loading: boolean;
}

class BurgerBuilder extends Component<propType, stateType> {
    state: stateType = {
        purchasing: false,
        loading: false,
    }

    updatePurchasableState(ingredients = this.props.ingredients) {
        const sum = Object.keys(ingredients).map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

     componentDidMount() {
       this.props.onInitIngredients();
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            // @ts-ignore
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients cannot be loaded...</p>: <Spinner/>;
        if (Object.keys(this.props.ingredients).length > 0) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved} disabled={disabledInfo}
                                   price={this.props.totalPrice} purchasable={this.updatePurchasableState()}
                                   ordered={this.purchaseHandler}/>
                </>
            );
            orderSummary = (
                <OrderSummary ingredients={this.props.ingredients} continue={this.purchaseContinueHandler}
                              cancel={this.purchaseCancelHandler} price={this.props.totalPrice}/>
            );
            if (this.state.loading) {
                orderSummary = <Spinner/>;
            }
        }
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state: reducerType)=>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch: Dispatch<MyAction<ActionTypes>>|any) => {
    return {
        onIngredientAdded: (name: string)=>dispatch(actions.add_ingredient(name)),
        onIngredientRemoved: (name: string)=>dispatch(actions.remove_ingredient(name)),
        onInitIngredients: ()=>dispatch(actions.initIngredients()),
        onPurchaseInit: ()=>dispatch(actions.purchaseOrderInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));
