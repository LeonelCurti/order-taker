import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import MyOrders from "./components/dashboard/MyOrders";
import NewOrder from "./components/dashboard/NewOrder";
import PriceList from "./components/dashboard/PriceList";
import NotFound from "./components/layout/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login_mui";

const App = () => {  
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/new_order" exact component={NewOrder} />
        <Route path="/dashboard/my_orders" exact component={MyOrders} />
        <Route path="/dashboard/price_list" exact component={PriceList} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
