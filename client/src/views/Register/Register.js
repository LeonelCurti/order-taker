import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import checkInputValidity from "../../utils/checkInputValidity";
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
  const [formData, setFormData] = useState({
    firstName: {
      value: "",
      valid: false,
      touched: false,
      focused: false,
      validation: {
        required: true,
      },
      validationMsg: "",
    },
    lastName: {
      value: "",
      valid: false,
      touched: false,
      focused: false,
      validation: {
        required: true,
      },
      validationMsg: "",
    },
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
        minLength: 4,
      },
      validationMsg: "",
    },
  });

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["REGISTER"]);
    };
  }, [removeErrors]);

  const { firstName, lastName, email, password } = formData;

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
      register(dataToSubmit(), history);
    }
  };

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
          <form className={classes.form} noValidate >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField                  
                  name="firstName"
                  variant="outlined"
                  error={
                    !firstName.valid && firstName.touched && !firstName.focused
                  }
                  fullWidth
                  onChange={handleChanges}
                  onFocus={toggleFocused}
                  onBlur={toggleFocused}
                  inputProps={{ className: classes.input }}
                  id="firstName"
                  label="First Name"
                  value={firstName.value}
                  helperText={firstName.validationMsg}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  error={
                    !lastName.valid && lastName.touched && !lastName.focused
                  }
                  onChange={handleChanges}
                  onFocus={toggleFocused}
                  onBlur={toggleFocused}
                  inputProps={{ className: classes.input }}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName.value}
                  helperText={lastName.validationMsg}
                />
              </Grid>
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={!formIsValid()}
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
