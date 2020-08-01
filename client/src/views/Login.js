import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import { login, clearErrors } from "../redux/actions/auth";

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
    // WebkitBoxShadow: "0 0 0 1000px #f4f6f8 inset",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { login, clearErrors, history } = props;
  const { isAuthenticated,  error } = props.auth;
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      focused: false,
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
      focused: false,
      validation: {
        required: true,
      },
      validationMsg: "",
    },
  });

  const { email, password } = formData;

  const handleChanges = (e) => {
    const updatedFormData = { ...formData };
    let formElement = { ...updatedFormData[e.target.name] };

    formElement.value = e.target.value;
    formElement.touched = true;
    formElement = checkInputValidity(formElement);
    updatedFormData[e.target.name] = formElement;

    setFormData(updatedFormData);
  };

  const toggleFocused = (e) => {
    const updatedFormData = { ...formData };
    let formElement = { ...updatedFormData[e.target.name] };
    formElement.focused = !formElement.focused;
    updatedFormData[e.target.name] = formElement;
    setFormData(updatedFormData);
  };

  const formIsValid = () => {
    const formIsValid = Object.values(formData).every(
      (identifier) => identifier.valid
    );
    return formIsValid;
  };

  const dataToSubmit = () => {
    const newFormData = {};
    for (let formIdentifier in formData) {
      newFormData[formIdentifier] = formData[formIdentifier].value;
    }
    return newFormData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      login(dataToSubmit());
    }
  };

  const handleRedirection = (e) => {
    e.preventDefault();
    if (error) {
      clearErrors();
    }
    history.push("/register");
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
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  error={!email.valid && email.touched && !email.focused}
                  // FormHelperTextProps={{error:true}}
                  onChange={handleChanges}
                  onFocus={toggleFocused}
                  onBlur={toggleFocused}
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
                  error={
                    !password.valid && password.touched && !password.focused
                  }
                  onChange={handleChanges}
                  onFocus={toggleFocused}
                  onBlur={toggleFocused}
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={handleSubmit}
              disabled={!formIsValid()}
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
        </div>
      </Container>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
