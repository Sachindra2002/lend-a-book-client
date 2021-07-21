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
    Axios.post("http://localhost:5000/signup", {
      ...values,
      [name]: value,
    })
      .then((response) => {
        console.log(response);
         
      })
      .catch(err => {
        console.log(err);
      }) 
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
