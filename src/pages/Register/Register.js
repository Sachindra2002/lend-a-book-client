import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import useForm from './useForm'
import validate from './validateInfo'

function Register() {
  // const [membershipOption, setMembershipOption] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dob, setDob] = useState("");
  // const [phonenumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");

  // const displayInfo = () => {
  //   console.log(
  //     membershipOption +
  //       firstName +
  //       lastName +
  //       email +
  //       dob +
  //       phonenumber +
  //       password
  //   );
  // };
  const {handleChange, values, handleSubmit, errors} = useForm(validate);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">Create a new account</div>
        <form onSubmit={handleSubmit}>
          <div className="subscription-option">
            <div className="options">
              <input
                type="radio"
                id="bronze"
                name="option"
                value={values.option}
                onChange={handleChange}
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
                value={values.option}
                onChange={handleChange}
                required
              />
              <label htmlFor="silver" style={{ color: "#C0C0C0" }}>
                Silver
              </label>
              <input
                type="radio"
                id="gold"
                name="option"
                value={values.option}
                onChange={handleChange}
                required
              />
              <label htmlFor="gold" style={{ color: "#FFD700" }}>
                Gold
              </label>
              <input
                type="radio"
                id="platinum"
                name="option"
                value={values.option}
                onChange={handleChange}
                required
              />
              <label htmlFor="platinum" style={{ color: "#88D3E1" }}>
                Platinum
              </label>
            </div>
          </div>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name here"
                value={values.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name here"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter a valid email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-box">
              <span className="details">Date of Birth</span>
              <input
                type="date"
                min="1940-12-25"
                max="2015-12-25"
                placeholder="DOB"
                name="dob"
                value={values.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className="error">{errors.dob}</p>}
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                name="phonenumber"
                placeholder="Enter your Phone Number"
                value={values.phonenumber}
                onChange={handleChange}
              />
              {errors.phonenumber && <p className="error">{errors.phonenumber}</p>}
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="input-box">
              <span className="details">Enter password again</span>
              <input
                type="password"
                placeholder="Confirm your password"
                name="password2"
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p className="error">{errors.password2}</p>}
            </div>
            <div htmlFor="myfile" className="uploadTitle">
              Please upload a photo of you for human verification
            </div>
            <input
              type="file"
              id="myFile"
              name="filename"
              className="uploadButton"
              accept="image/*"
            ></input>
          </div>
          <button type="submit" className="proceed-to-payment">
            Proceed to payment
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
