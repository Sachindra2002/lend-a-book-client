import React, { Component } from "react";
import Register from "./Register";

export class UserForm extends Component {
  state = {
    step: 1,
    option: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    password: "",
    password2: "",
  }

  //Proceed to payment
  const nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  //Go back to previos state
  const prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  //Handle fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  render() {
    const {step} = this.state;
    const {option, email, firstName, lastName, dob, phoneNumber, password};
    const values = {option, email, firstName, lastName, dob, phoneNumber, password};
    switch (step) {
        case 1:
            return(
                <Register
                nextStep = {this.nextStep}
                handleChange ={this.handleChange}
                values = {values}
                />
            )
            break;
    
        default:
            break;
    }
  }
}

export default UserForm;
