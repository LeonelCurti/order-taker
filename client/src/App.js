import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import PrivateRoute from "./components/hoc/PrivateRoute";

import Dashboard from "./views/Dashboard";
import MyOrders from "./views/MyOrders";
import NewOrder from "./views/NewOrder";
import ProductList from "./views/ProductList";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";
import Loader from "./components/Loader";

import store from "./store";
import { loadUser, clearErrors } from "./actions/auth";

const App = () => {
  useEffect(() => {
    const isFirstLoad = true;
    store.dispatch(loadUser(isFirstLoad));
    // store.dispatch(clearErrors());
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute path="/new_order" exact component={NewOrder} />
          <PrivateRoute path="/my_orders" exact component={MyOrders} />
          <PrivateRoute path="/product_list" exact component={ProductList} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/loader" exact component={Loader} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
