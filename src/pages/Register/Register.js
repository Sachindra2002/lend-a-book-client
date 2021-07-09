import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";

function Register() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">Create a new account</div>
        <form>
          <div className="subscription-option">
            <div className="options">
              <input
                type="radio"
                id="bronze"
                name="option"
                required
                defaultChecked
              />
              <label for="bronze" style={{ color: "#cd7f32" }}>
                Bronze
              </label>
              <input
                type="radio"
                id="silver"
                name="option"
                value="hhha"
                required
              />
              <label for="silver" style={{ color: "#C0C0C0" }}>
                Silver
              </label>
              <input type="radio" id="gold" name="option" required />
              <label for="gold" style={{ color: "#FFD700" }}>
                Gold
              </label>
              <input type="radio" id="platinum" name="option" required />
              <label for="platinum" style={{ color: "#88D3E1" }}>
                Platinum
              </label>
            </div>
          </div>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input type="text" placeholder="Enter first name here" required />
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input type="text" placeholder="Enter last name here" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter a valid email" required />
            </div>
            <div className="input-box">
              <span className="details">Date of Birth</span>
              <input
                type="date"
                min="1940-12-25"
                max="2015-12-25"
                placeholder="DOB"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                placeholder="Enter your Phone Number"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="text" placeholder="Enter a password" required />
            </div>
            <div className="input-box">
              <span className="details">Enter password again</span>
              <input type="text" placeholder="Confirm your password" required />
            </div>
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
