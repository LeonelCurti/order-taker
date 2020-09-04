import React, { useEffect, Fragment } from "react";
import { onTryAutoLogin, logout } from "../../redux/actions/auth";
import { connect } from "react-redux";
/*
Features of this hoc:
autologin when app loads (if auth token exist
and is not expired) and autologout in all other open tabs
when user performs a logout.
*/
const Auth = (props) => {
  const { children, onTryAutoLogin, logout } = props;
  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  useEffect(() => {
    const syncLogout = (e) => {
      if (e.key === "access_token" && e.oldValue && !e.newValue) {
        // window.location.href = window.location.origin + '/login'
        console.log("ejecuto syncLogout");
        logout();
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [logout]);

  return <Fragment>{children}</Fragment>;
};

export default connect(null, { onTryAutoLogin, logout })(Auth);
