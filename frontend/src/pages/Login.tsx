import React from "react";
import "../styles/App.css";
import PageContent from "../PageContent";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  FormGroup as Group,
  FormControl as Input,
  FormLabel as Label,
  Col,
  Container,
  Row
} from "react-bootstrap";
import axios from "axios";

// Add state here
export interface LoginState {
  email: string;
  password: string;
  loginSuccess: boolean;
}

// Add passed in props here
export interface LoginProps {}

export default class LoginForm extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    // @ts-ignore
    // TODO fix this type error
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleSubmit(event: any) {
    // TODO get the endpoint from config
    const res = await axios.post(
      "http://localhost:4000/auth/authenticate",
      {
        email: this.state.email,
        password: this.state.password
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      this.setState({ loginSuccess: true });
    }
  }

  render() {
    return (
      <Container className="content-body" fluid={true}>
        <Row>
          <Col className="content-body-2">
            <div className="body-heading">{PageContent.loginPage.existing_cust_label}</div>
            <div className="input">
              <Group>
                <Label>{PageContent.email.label}</Label>
                <Input
                  type="text"
                  placeholder={PageContent.email.placeholder}
                  id="email"
                  onChange={this.handleChange}
                />

                <Label>{PageContent.password.label}</Label>
                <Input
                  type="password"
                  placeholder={PageContent.password.login_placeholder}
                  id="password"
                  onChange={this.handleChange}
                />

                <Button
                className="button"
                id="buttonLogin"
                onClick={this.handleSubmit}
                >
                Log In
                </Button>
                {this.state.loginSuccess && <Redirect to={"/account"} />}
              </Group>
            </div>
            <div className="body-heading">{PageContent.loginPage.new_cust_label}</div>
            <div className="input">
              <Link to="/register/user">
                <Button className="button btn-outline-primary" id="buttonRegisterUser">
                  Register
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="login-col">
            <div>
          <img src="./placeholder_assets/login-image.jpg" className="img-split" alt="Loign-Image"></img>
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
