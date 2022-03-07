import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";

//REDUX
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSucccess] = useState("")

  const useInput = ({
    type,
    value,
    label,
    placeholder,
    changeHandler,
    id,
    pattern,
    isTextArea,
  }) => {
    const input = (
      <Form.Group controlId={id}>
        <span className=""> {label} </span>
        <Form.Control
          type={type}
          placeholder={placeholder}
          className={errors[id] ? "form is-invalid" : "form"}
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
          name={id}
          pattern={pattern}
          as={isTextArea && "textarea"}
        />
        <p className="error-text" hidden={!errors[id]}>
          {errors[id]}
        </p>
      </Form.Group>
    );
    return input;
  };

  //update state with errors
  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.error);
  }, [props.UI.errors]);

  //When submit button is clicked
  const handleSubmit = (event) => {
    //prevent page from loading
    event.preventDefault();
    const data = {
      email,
      password,
    };

    //Use user input to register user
    props.loginUser(data, props.history);
  };

  //Generate fields using function

  const emailInput = useInput({
    type: "email",
    value: email,
    label: "Email address",
    changeHandler: setEmail,
    placeholder: "Email address",
    id: "email",
  });

  const passwordInput = useInput({
    type: "password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
    id: "password",
    placeholder: "Password",
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">Login</div>
        <Form onSubmit={handleSubmit}>
          <div className="user-details-login">
            <div className="input-box-login">
              {emailInput}
              {passwordInput}
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </div>
          <p>{success}</p>
        </Form>
      </div>
      <Footer />
    </>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
