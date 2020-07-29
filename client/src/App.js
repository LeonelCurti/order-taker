import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from "./components/hoc/PrivateRoute";
import AlertHandler from "./components/AlertHandler";

import Dashboard from "./views/Dashboard";
import MyOrders from "./views/MyOrders";
import NewOrder from "./views/NewOrder";
import ViewOrder from "./views/ViewOrder";
import ProductsList from "./views/ProductsList";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";

import { loadUser } from "./store/actions/auth";

const App = (props) => {
  const { loadUser } = props;

  useEffect(() => {
    const isFirstLoad = true;
    loadUser(isFirstLoad);
  }, [loadUser]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />    
        <AlertHandler />  
        <Switch>
          <PrivateRoute path="/new_order" exact component={NewOrder} />
          <PrivateRoute path="/my_orders/view_order" exact component={ViewOrder} />
          <PrivateRoute path="/my_orders" exact component={MyOrders} />
          <PrivateRoute path="/product_list" exact component={ProductsList} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default connect(null, { loadUser })(App);
