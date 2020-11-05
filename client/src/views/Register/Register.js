import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import VisibilityPasswordTextField from "../../components/VisibilityPasswordTextField";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { register } from "../../redux/actions/auth";
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
    margin: theme.spacing(3, 0, 1),
  },
  input: {
    //remove white background on textField when autofill
    WebkitBoxShadow: "0 0 0 1000px #f4f6f8 inset",
  },
}));

const Register = (props) => {
  const { register, history, isAuthenticated, error, removeErrors } = props;
  const classes = useStyles();

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["REGISTER"]);
    };
  }, [removeErrors]); 

  const handleRedirection = (e) => {
    e.preventDefault();
    history.replace("/login");
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="auth-container">
      <Logo />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              // policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(64)
                .required("Email is required"),
              firstName: Yup.string()
                .max(32)
                .required("First name is required"),
              lastName: Yup.string().max(32).required("Last name is required"),
              password: Yup.string().max(100).min(4).required("password is required"),
              // policy: Yup.boolean().oneOf([true], "This field must be checked"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              register(values, history);
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth                   
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ className: classes.input }}
                      id="firstName"
                      label="First Name"
                      value={values.firstName}
                      helperText={touched.firstName && errors.firstName}                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ className: classes.input }}
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="email"
                      label="Email"
                      value={values.email}
                      name="email"
                      inputProps={{ className: classes.input }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VisibilityPasswordTextField
                      variant="outlined"
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      label="Password"
                      value={values.password}
                      type="password"
                      id="password"
                      inputProps={{ className: classes.input }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}             
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <FormHelperText error={true} className={classes.errorMsg}>
                  {error}
                </FormHelperText>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleRedirection}
                    >
                      Already have an account? Log in
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

Register.protoTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error["REGISTER"],
});

export default connect(mapStateToProps, { register, removeErrors })(Register);
