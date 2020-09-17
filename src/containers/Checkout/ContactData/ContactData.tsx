import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from './ContactData.module.css';
import {RouteComponentProps} from "react-router-dom";
import { connect } from 'react-redux';
import {purchaseOrder} from '../../../store/actions';
import reducerType from "../../../interfaces/reducer";

type propType = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface stateType {
    orderForm: {
        [key: string]: {
            [key: string]: any;
        }
    };
    formIsValid: boolean;
}

class ContactData extends Component<propType & RouteComponentProps, stateType> {
    state: stateType = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                touched: false,
                valid: true
            }
        },
        formIsValid: false
    }
    orderHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: { [key: string]: string } = {};
        for (let formDataIdentifier in this.state.orderForm) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        this.props.onOrderForm(order);
    }
    checkValidity(value: string, rules: {[key: string]: any}): boolean{
        let isValid: boolean = true;
        if(rules?.required){
            isValid = value.trim() !== '';
        }
        if(rules?.minLength){
            isValid = isValid && value.trim().length >= rules.minLength;
        }
        if(rules?.maxLength){ 
            isValid = isValid && value.trim().length <= rules.maxLength;
        }
        return isValid;
    }
    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, identifier: string) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[identifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedForm){
            formIsValid = formIsValid && updatedForm[key].valid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {
                formElementsArray.map((formElement) => {
                    return (
                        <Input key={formElement.id} elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                               changed={(event) => this.inputChangedHandler(event, formElement.id)} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched}/>
                    );
                })
            }
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = (state: reducerType)=>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderForm: (orderData: any) => dispatch(purchaseOrder(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);