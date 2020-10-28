import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import PrivateRoute from "./components/hoc/PrivateRoute";
import AlertSnackbar from "./components/AlertSnackbar";
import TopLinearLoader from "./components/TopLinearLoader";
import Auth from "./components/auth/Auth";

import {
  Dashboard,
  Orders,
  Catalog,
  ViewOrder,
  NotFound,
  Login,
  Register,
  NewOrder,
} from "./views";

import Test from "./views/Test";


const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AlertSnackbar />
            <TopLinearLoader />
            <Switch>
              <PrivateRoute path="/new_order" exact component={NewOrder} />
              <PrivateRoute
                path="/orders/view_order"
                exact
                component={ViewOrder}
              />
              <PrivateRoute path="/orders" exact component={Orders} />
              <PrivateRoute path="/catalog" exact component={Catalog} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/test" exact component={Test} />
              <Route path="/" exact component={Login} />
              <Route component={NotFound} />
            </Switch>
          </ThemeProvider>
        </Router>
      </Auth>
    </Provider>
  );
};

export default App;
