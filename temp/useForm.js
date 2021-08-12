import { useState } from "react";
import Axios from "axios";

const useForm = (validate) => {

  const [values, setValues] = useState({
    option: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phonenumber: "",
    password: "",
    password2: "",
    creditNumber: "",
    creditExpires: "",
    creditCvc: "",
    totalAmount: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setErrors(validate(values));
    Axios.post("/signup", {
      ...values,
      [name]: value,
    })
      .then(function (response) {
        alert("Account created successfully");
      })
      .catch(function (err) {
        try {
          if (err.response.status === 400) {
            alert("Email already in use");
          } else if (err.response.status === 500) {
            alert("Something went wrong when registering");
          } else {
            alert("Could not connect to server");
          }
        } catch (Exception) {
          alert("Could not connect to server");     
        }

        console.log(err);
      });
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
