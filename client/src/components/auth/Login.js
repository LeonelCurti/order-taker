import React, { Fragment } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import Footer from "../layout/Footer";
import Logo from "../layout/Logo";

const Login = () => {
  const validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };
  const onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submited");
  };
  return (
    <div className="auth-container">
      <Logo />
      <Container>
        <Form
          onSubmit={submitForm}
          className="auth-form"
          style={{
            margin: "0 auto",
            maxWidth: "320px",
          }}
        >
          <h2 className="text-center">Login</h2>
       
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@email.com"
              />
            </FormGroup>       
     
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
              />
            </FormGroup>
          
          <Button color='success' block>LOGIN</Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
