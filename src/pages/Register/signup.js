import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./signup.css";

//REDUX
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";

function Register(props) {
  const [option, setOption] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiryDate, setCreditCardExpiryDate] = useState("");
  const [creditCardCvv, setCreditCardCvv] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});

  //Function to generate form control inputs for each field
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

    const data = new FormData();
    data.append("option", option);
    data.append("email", email);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("dob", dob);
    data.append("phoneNumber", phoneNumber);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("creditCardNumber", creditCardNumber);
    data.append("creditCardExpiryDate", creditCardExpiryDate);
    data.append("creditCardCvv", creditCardCvv);
    data.append("totalAmount", totalAmount);
    data.append("file", file);

    //Use user input to register user
    props.registerUser(data, props.history);
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

  const firstNameInput = useInput({
    type: "text",
    value: firstName,
    label: "First name",
    changeHandler: setFirstName,
    id: "firstName",
    placeholder: "First name",
  });

  const lastNameInput = useInput({
    type: "text",
    value: lastName,
    label: "Last name",
    changeHandler: setLastName,
    id: "lastName",
    placeholder: "Last name",
  });

  const phoneNumberInput = useInput({
    type: "text",
    value: phoneNumber,
    label: "Phone number",
    changeHandler: setPhoneNumber,
    id: "phoneNumber",
    pattern: "[0-9]{10}",
    placeholder: "Phone number",
  });

  const passwordInput = useInput({
    type: "password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
    id: "password",
    placeholder: "Password",
  });

  const confirmPasswordInput = useInput({
    type: "password",
    value: confirmPassword,
    label: "Confirm password",
    changeHandler: setConfirmPassword,
    id: "confirmPassword",
    placeholder: "Confirm password",
  });

  const creditCardNumberInput = useInput({
    type: "text",
    value: creditCardNumber,
    label: "Enter credit card number",
    placeholder: "0000-0000-0000-0000",
    changeHandler: setCreditCardNumber,
    id: "creditCardNumber",
    pattern:
      "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$",
  });

  const creditCardExpiryDateInput = useInput({
    type: "text",
    value: creditCardExpiryDate,
    label: "Enter card expiry date",
    placeholder: "mm/dd",
    changeHandler: setCreditCardExpiryDate,
    id: "creditCardExpiryDate",
    //pattern: "/^[0-9]{3,4}$/",
  });

  const creditCardCvvInput = useInput({
    type: "text",
    value: creditCardCvv,
    label: "Enter card CVV",
    placeholder: "000",
    changeHandler: setCreditCardCvv,
    id: "crediCardCvv",
  });

  const totalAmountInput = useInput({
    type: "text",
    value: totalAmount,
    label: "Total amount",
    placeholder: "2000 + package",
    changeHandler: setTotalAmount,
    id: "totalAmount",
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">Create a new account</div>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="subscription-option">
            <div className="options">
              <input
                type="radio"
                id="bronze"
                name="option"
                value="bronze"
                onChange={() => setOption("bronze")}
                onClick={() => setTotalAmount("3000 LKR")}
                required
                defaultChecked
              />
              <label htmlFor="bronze" style={{ color: "#cd7f32" }}>
                Bronze
              </label>
              <input
                type="radio"
                id="silver"
                name="option"
                value="silver"
                onChange={() => setOption("silver")}
                onClick={() => setTotalAmount("4000 LKR")}
                required
              />
              <label htmlFor="silver" style={{ color: "#C0C0C0" }}>
                Silver
              </label>
              <input
                type="radio"
                id="gold"
                name="option"
                value="gold"
                onChange={() => setOption("gold")}
                onClick={() => setTotalAmount("5000 LKR")}
                required
              />
              <label htmlFor="gold" style={{ color: "#FFD700" }}>
                Gold
              </label>
              <input
                type="radio"
                id="platinum"
                name="option"
                value="platinum"
                onChange={() => setOption("bronze")}
                onClick={() => setTotalAmount("7000 LKR")}
                required
              />
              <label htmlFor="platinum" style={{ color: "#88D3E1" }}>
                Platinum
              </label>
            </div>
          </div>
          <div className="user-details">
            <div className="input-box">
              {firstNameInput}
              {lastNameInput}
              {emailInput}
              <span className="">Date of Birth</span>
              <input
                type="date"
                min="1940-12-31"
                max="2015-12-31"
                placeholder="DOB"
                name="dob"
                id="dob"
                onChange={(event) => setDob(event.target.value)}
                required
              />
              {phoneNumberInput}
              {passwordInput}
              {confirmPasswordInput}
            </div>
            <div htmlFor="myfile" className="uploadTitle">
              Please upload a photo of you for human verification
            </div>
            <input
              type="file"
              id="file"
              name="image"
              className="uploadButton"
              onChange={(event) => setFile(event.target.files[0])}
              accept="image/*"
            ></input>
          </div>
          <h2 className="title">Payment Section</h2>
          <div className="payment-details">
            <div className="input-box">
              {creditCardNumberInput}
              {creditCardExpiryDateInput}
              {creditCardCvvInput}
              {totalAmountInput}
            </div>
          </div>
          <button type="submit" className="proceed-to-payment">
            Create Account
          </button>
        </Form>
      </div>
      <Footer />
    </>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
