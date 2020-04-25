import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
// import theme from './theme';
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";
//Views
import Dashboard from "./views/Dashboard";
import MyOrders from "./views/MyOrders";
import NewOrder from "./views/NewOrder";
import ProductList from "./views/ProductList";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";
import Loader from "./components/Loader";
//Redux for initial user load
import store from "./store";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
