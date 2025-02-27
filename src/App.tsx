import React from 'react';
import {Route} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

function App() {
  return (
    <div>
      <Layout>
         <Route path="/checkout" component={Checkout} />
         <Route path="/orders" component={Orders} />
         <Route path="/auth" component={Auth} />
         <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    </div>
  );
}

export default App;
