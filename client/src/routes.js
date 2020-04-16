import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import Dashboard from "./dashboard/Dashboard";
import MyOrders from "./dashboard/MyOrders";
import NewOrder from "./dashboard/NewOrder";
import PriceList from "./dashboard/PriceList";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
