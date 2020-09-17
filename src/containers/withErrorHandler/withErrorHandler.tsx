import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import instance from "../../axios-order";

const withErrorHandler = (WrappedComponent: any, axios: typeof instance) => {
    return class extends React.Component<any, any> {
        reqInterceptor: number | null;
        resInterceptor: number | null;
        state: { error: any };

        constructor(props: any) {
            super(props);
            this.state = {error: null};
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;

            },(err)=>{
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                // console.log(error); //Logs the error object
                this.setState({error: error});
                // console.log(this); //Logs null
            });

        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        componentWillUnmount() {
            if (this.reqInterceptor != null)
                axios.interceptors.request.eject(this.reqInterceptor);
            if (this.resInterceptor != null)
                axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <>
                    <Modal show={!!this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error?.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;