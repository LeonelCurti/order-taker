import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, roles, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuthenticated) {
          console.log("not logged in so redirect to login page");
          return <Redirect to="/login" />;
        }

        // check if route is restricted by role
        if (roles && !roles.includes(auth.user.role)) {
          console.log("role not authorized so redirect to home page");
          return <Redirect to="/" />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
