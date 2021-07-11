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
  }


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

  return errors;
};

export default validateInfo;
