import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import checkInputValidity from "../utils/checkInputValidity";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import LinearLoader from '../components/LinearLoader'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    //remove white background on textField when autofill
    // WebkitBoxShadow: "0 0 0 1000px #f4f6f8 inset",
  },
}));

const Login = ({ login, isAuthenticated, loading }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    formData: {
      email: {
        value: "",
        valid: false,
        touched: false,
        pristine: true,
        validation: {
          required: true,
          isEmail: true,
        },
        validationMsg: "",
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        pristine: true,
        validation: {
          required: true,
          minLength: 4,
        },
        validationMsg: "",
      },
    },
    formError: {
      error: false,
      msg: "",
    },
  });

  const {
    formError,
    formData: { email, password },
  } = formState;

  const handleChanges = ({ e, eventType }) => {
    //copy old state
    const updatedFormData = { ...formState.formData };
    //get copy of selected formElement to be updated
    let formElement = { ...updatedFormData[e.target.name] };
    //reset error for formHelperText in submit button
    const updatedFormError = { error: false, msg: "" };

    switch (eventType) {
      case "onBlur":
        if (!formElement.pristine) {
          formElement = checkInputValidity(formElement);
        }
        break;
      case "onChange":
        formElement.pristine = false;
        formElement.value = e.target.value;
        break;
      case "onFocus":
        if (formElement.touched && !formElement.valid) {
          formElement.touched = false;
        }
        break;
      default:
        return;
    }
    //replace selected old formElement with new data obtained
    updatedFormData[e.target.name] = formElement;
    //update state
    setFormState({
      ...formState,
      formData: updatedFormData,
      formError: updatedFormError,
    });
  };

  const formIsValid = () => {
    const formIsValid = Object.values(formState.formData).every(
      (identifier) => identifier.valid
    );

    return formIsValid;
  };

  const dataToSubmit = () => {
    return {
      email: email.value,
      password: password.value,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    //testing
    login(
      {
        email: "luis2@gmail.com",
        password: "1234",
      }
    );

    // if (formIsValid()) {
    //   login(dataToSubmit());
    // } else {
    //   setFormState({
    //     ...formState,
    //     formError: {
    //       error: true,
    //       msg: "Please check empty or invalid fields and try again.",
    //     },
    //   });
    // }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="auth-container">
      {loading && <LinearLoader />}
      <Logo />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  error={!email.valid && email.touched}
                  onChange={(e) => handleChanges({ e, eventType: "onChange" })}
                  onBlur={(e) => handleChanges({ e, eventType: "onBlur" })}
                  onFocus={(e) => handleChanges({ e, eventType: "onFocus" })}
                  id="email"
                  label="Email"
                  value={email.value}
                  name="email"
                  helperText={email.validationMsg}
                  inputProps={{ className: classes.input }}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  error={!password.valid && password.touched}
                  onChange={(e) => handleChanges({ e, eventType: "onChange" })}
                  onBlur={(e) => handleChanges({ e, eventType: "onBlur" })}
                  onFocus={(e) => handleChanges({ e, eventType: "onFocus" })}
                  name="password"
                  label="Password"
                  value={password.value}
                  type="password"
                  id="password"
                  helperText={password.validationMsg}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <FormHelperText error={formError.error}>
              {formError.msg}
            </FormHelperText>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Need an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { login })(Login);
