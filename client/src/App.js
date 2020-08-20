import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from "./components/hoc/PrivateRoute";
import AlertSnackbar from "./components/AlertSnackbar";
import TopLinearLoader from './components/TopLinearLoader'

import Dashboard from "./views/Dashboard";
import Orders from "./views/Orders";
import NewOrder from "./views/NewOrder";
import ViewOrder from "./views/ViewOrder";
import Catalog from "./views/Catalog";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";

import { onTryAutoLogin } from "./redux/actions/auth";

const App = (props) => {
  const { onTryAutoLogin } = props;

  useEffect(() => { 
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />    
        <AlertSnackbar />
        <TopLinearLoader />  
        <Switch>
          <PrivateRoute path="/new_order" exact component={NewOrder} />
          <PrivateRoute path="/orders/view_order" exact component={ViewOrder} />
          <PrivateRoute path="/orders" exact component={Orders} />
          <PrivateRoute path="/catalog" exact component={Catalog} />
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

export default connect(null, { onTryAutoLogin })(App);
