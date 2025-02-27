import React, {Component} from "react";
import { connect} from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route, RouteComponentProps, Redirect } from "react-router-dom";
import reducerType from "../../interfaces/reducer";

type propType = RouteComponentProps & ReturnType<typeof mapStateToProps>;

class Checkout extends Component<propType>{

    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />;
        if(Object.keys(this.props.ingredients).length > 0){
            const purchased = this.props.purchased ? <Redirect to="/" />: null;
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = (state: reducerType)=>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);