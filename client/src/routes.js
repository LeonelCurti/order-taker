import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Orders,
  Catalog,
  ViewOrder,
  NotFound,
  Login,
  Register,
  NewOrder,
  TestPage,
} from "./pages";
import PrivateRoute from "./components/PrivateRoute";
import { authRoles } from "./utils/userRoles";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/new_order" exact component={NewOrder} />
        <PrivateRoute path="/orders/view_order" exact component={ViewOrder} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/catalog" exact component={Catalog} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute
          path="/test"
          exact
          roles={authRoles.guest}
          component={TestPage}
        />
        {/* <Route path="/" exact component={Login} /> */}
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
