const validateInfo = (values) => {
  let errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name required";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Last name required";
  }

  if (!values.dob.trim()) {
    errors.dob = "Date of birth required";
  }

  if (!values.phonenumber) {
    errors.phonenumber = "Phone number required";
  }else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g.test(values.phonenumber)){
    errors.phonenumber = "Enter valid phone number"
  };


  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required ";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  if (!values.creditNumber){
    errors.creditNumber = "Please enter credit card number";
  }else if (!/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(values.creditNumber)){
    errors.creditNumber = "Please enter valid credit card number";
  }

  if (!values.creditExpires){
    errors.creditExpires = "Please enter the date of expiry"
  }else if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/mg.test(values.creditExpires)){
    errors.creditExpires = "Please enter valid expiry date"
  }

  if (!values.creditCvc){
    errors.creditCvc = "Please enter CVC"
  }else if (!/^[0-9]{3,4}$/.test(values.creditCvc)){
    errors.creditCvc = "Please enter valid CVC"
  }

  return errors;
};

export default validateInfo;
