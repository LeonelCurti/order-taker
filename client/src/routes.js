import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from './theme';

import Dashboard from "./views/Dashboard";
import MyOrders from "./views/MyOrders";
import NewOrder from "./views/NewOrder";
import ProductList from "./views/ProductList";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/new_order" exact component={NewOrder} />
          <Route path="/my_orders" exact component={MyOrders} />
          <Route path="/product_list" exact component={ProductList} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
   </ThemeProvider>
  );
};

export default App;
