import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import VisibilityPasswordTextField from "../../components/VisibilityPasswordTextField";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../redux/actions/auth";
import { removeErrors } from "../../redux/actions/error";
import * as Yup from "yup";
import { Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  errorMsg: {
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    //remove white background on textField when autofill
    WebkitBoxShadow: "0 0 0 1000px #f4f6f8 inset",
    // boxShadow: '0 0 0 0',    
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { login, history, isAuthenticated, error, removeErrors } = props;

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["LOGIN", "AUTOLOGIN"]);
    };
  }, [removeErrors]);

  const handleRedirection = (e) => {
    e.preventDefault();
    history.replace("/register");
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="auth-container">
      <Logo />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Log In
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}     
            onSubmit={(values, { setSubmitting }) => {
              login(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,       
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="email"
                      label="Email address"
                      value={values.email}
                      name="email"
                      helperText={touched.email && errors.email}
                      inputProps={{ className: classes.input }}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VisibilityPasswordTextField
                      variant="outlined"
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      label="Password"
                      value={values.password}
                      type="password"
                      id="password"
                      helperText={touched.password && errors.password}
                      inputProps={{ className: classes.input }}
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <FormHelperText error={true} className={classes.errorMsg}>
                  {error}
                </FormHelperText>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleRedirection}
                    >
                      Need an account? Register
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error["LOGIN"],
});

export default connect(mapStateToProps, { login, removeErrors })(Login);
