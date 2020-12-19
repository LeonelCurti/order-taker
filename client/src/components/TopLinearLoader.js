import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
// import { connect } from "react-redux";
// import { loadingSelector } from "../redux/selector/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    position: "absolute",
    zIndex: 9999,
  },
}));

const TopLinearLoader = (props) => {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.auth.isLoading);


  return (
    isLoading && (
      <div className={classes.root}>
        <LinearProgress color='secondary' />
      </div>
    )
  );
};
// const mapStateToProps = (state) => ({
//   isLoading: loadingSelector(state, [
//     "AUTOLOGIN",
//     "LOAD_USER",
//     "LOGIN",
//     "REGISTER",
//     "LOGOUT",
//   ]),
// });

export default TopLinearLoader;
// export default connect(mapStateToProps)(TopLinearLoader);
