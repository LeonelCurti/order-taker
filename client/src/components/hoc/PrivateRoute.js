import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../Loader";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={
      (props) =>
        loading ? (
          <Loader />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )

        // isAuthenticated ? (
        //   user ? (
        //     <Component {...props} />
        //   ) : (
        //     <Loader />
        //   )
        // ) : (
        //   <Redirect to="/login" />
        // )

      // isAuthenticated ? (
      //     <Component {...props} />
      //   ) : (
      //     <Redirect to="/login" />
      //   )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
