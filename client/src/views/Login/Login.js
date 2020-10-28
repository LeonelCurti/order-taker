import React, { useState, useEffect } from "react";
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
import checkInputValidity from "../../utils/checkInputValidity";
import { login } from "../../redux/actions/auth";
import { removeErrors } from "../../redux/actions/error";

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
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { login, history, isAuthenticated, error, removeErrors } = props;

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

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["LOGIN", "AUTOLOGIN"]);
    };
  }, [removeErrors]);

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
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="on"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  error={!email.valid && email.touched && !email.focused}
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
                <VisibilityPasswordTextField
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
                  inputProps={{ className: classes.input }}
                  autoComplete="current-password"
                />
              </Grid>      
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}        
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error["LOGIN"],
});

export default connect(mapStateToProps, { login, removeErrors })(Login);