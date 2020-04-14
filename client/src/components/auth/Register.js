import React, { useState } from "react";
import Footer from "../layout/Footer";
import Logo from "../layout/Logo";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212B42",
    },
    secondary: {
      main: "#4DB6AC",
    },
  },
});

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
    margin: theme.spacing(3, 0, 1),
  },
  input: {
    //remove white background on textField when autofill
    WebkitBoxShadow: "0 0 0 1000px #B0BEC5 inset"
  }
}));

const Register = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    formData: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
        validationMsg: "",
      },
      lastName: {
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
        validationMsg: "",
      },
      email: {
        value: "",
        valid: false,
        touched: false,
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
    formData: { firstName, lastName, email, password },
  } = formState;

  const checkValidity = (formElement) => {
    const { validation, value } = formElement;
    let error = [true, ""];

    if (validation.isEmail) {
      const re = /\S+@\S+\.\S+/; //really simple regex validation!
      const isValid = re.test(value);
      const msg = `${!isValid ? "Please enter a valid email." : ""}`;
      error = !isValid ? [isValid, msg] : error;
    }
    if (validation.minLength) {
      const isValid = value.length >= validation.minLength;
      const msg = `${!isValid ? "Password must be at least 4 characters" : ""}`;
      error = !isValid ? [isValid, msg] : error;
    }
    if (validation.required) {
      const isValid = value.trim() !== "";
      const msg = `${!isValid ? "This field is required." : ""}`;
      error = !isValid ? [isValid, msg] : error;
    }
    formElement.touched = true;
    formElement.valid = error[0];
    formElement.validationMsg = error[1];

    return formElement;
  };

  const handleChanges = ({ e, eType }) => {
    //copy old state
    const updatedFormData = { ...formState.formData };
    //get copy of selected formElement to be updated
    let formElement = { ...updatedFormData[e.target.name] };
    //reset error for formHelperText in submit button
    const updatedFormError = { error: false, msg: "" };

    switch (eType) {
      case "onBlur":
        formElement = checkValidity(formElement);
        break;
      case "onChange":
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
    const formIsValid = Object.values(formState.formData).every(identifier =>identifier.valid);

    return formIsValid;
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {

        console.log(formState);      
     
    } else {
      setFormState({
        ...formState,
        formError: {
          error: true,
          msg: "Please check fields and try again.",
        },
      });
    }
  };

  return (
    <div className="auth-container">
      <Logo />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ThemeProvider theme={customTheme}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!firstName.valid && firstName.touched}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleChanges({ e, eType: "onChange" })}
                    onBlur={(e) => handleChanges({ e, eType: "onBlur" })}
                    onFocus={(e) => handleChanges({ e, eType: "onFocus" })}
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
                    error={!lastName.valid && lastName.touched}
                    onChange={(e) => handleChanges({ e, eType: "onChange" })}
                    onBlur={(e) => handleChanges({ e, eType: "onBlur" })}
                    onFocus={(e) => handleChanges({ e, eType: "onFocus" })}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName.value}
                    helperText={lastName.validationMsg}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    error={!email.valid && email.touched}
                    onChange={(e) => handleChanges({ e, eType: "onChange" })}
                    onBlur={(e) => handleChanges({ e, eType: "onBlur" })}
                    onFocus={(e) => handleChanges({ e, eType: "onFocus" })}
                    id="email"
                    label="Email"
                    value={email.value}
                    name="email"
                    helperText={email.validationMsg}
                    inputProps={{ className: classes.input }}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    error={!password.valid && password.touched}
                    onChange={(e) => handleChanges({ e, eType: "onChange" })}
                    onBlur={(e) => handleChanges({ e, eType: "onBlur" })}
                    onFocus={(e) => handleChanges({ e, eType: "onFocus" })}
                    name="password"
                    label="Password"
                    value={password.value}
                    type="password"
                    id="password"
                    helperText={password.validationMsg}
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
                // disabled={!formIsValid()}
              >
                Sign Up
              </Button>
              <FormHelperText error={formError.error}>
                {formError.msg}
              </FormHelperText>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={RouterLink} to='/login'  variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Register;
