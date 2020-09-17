import React, {Component, FormEvent} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {auth} from '../../store/actions';
import {connect} from "react-redux";


interface stateType {
    controls: {
        [key: string]: {
            [key: string]: any;
        }
    };
    isSignUp: boolean;
}

type propType = ReturnType<typeof mapDispatchToProps>;
class Auth extends Component<propType, stateType> {
    state: stateType = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }
    checkValidity(value: string, rules: {[key: string]: any}): boolean{
        let isValid: boolean = true;
        if(rules?.required){
            isValid = value.trim() !== '';
        }
        if(rules?.minLength){
            isValid = isValid && value.trim().length >= rules.minLength;
        }
        return isValid;
    }

inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, controlName: any) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched: true
        }
    }
    this.setState({controls: updatedControls});
    }
    submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);
    }
    switchModeHandler = () => {
        this.setState((prevState)=>{return {isSignUp: !prevState.isSignUp}});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formElementsArray.map((formElement) => {
                    return (
                        <Input key={formElement.id} elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                               changed={(event) => this.inputChangedHandler(event, formElement.id)} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched}/>
                    );
                });
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchModeHandler} btnType="Danger">SWITCH TO {this.state.isSignUp?"SIGNIN": "SIGNUP"}</Button>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
    onAuth: (email: string, password: string, isSignUp: boolean) => dispatch(auth(email,password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth);