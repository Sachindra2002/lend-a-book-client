import React from "react";
//import {useState} from 'react';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import useForm from "./useForm";
import validate from "./validateInfo";

function Register() {
  const { handleChange, values, handleSubmit, errors } = useForm(validate);
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
                value="bronze"
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
                value="silver"
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
                value="gold"
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
                value="platinum"
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
                required
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
                required
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
                required
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
                required
              />
              {errors.dob && <p className="error">{errors.dob}</p>}
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                name="phonenumber"
                maxLength="10"
                placeholder="Enter your Phone Number"
                value={values.phonenumber}
                onChange={handleChange}
                required
              />
              {errors.phonenumber && (
                <p className="error">{errors.phonenumber}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={values.password}
                onChange={handleChange}
                required
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
                required
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
          <h2 className="title">Payment Section</h2>
          <div className="payment-details">
            <div className="input-box">
              <span className="details">Enter Credit Card Number</span>
              <input
                className="cc-number"
                type="text"
                pattern="4\ d{ 12} (\ d{ 3} )?"
                name="creditNumber"
                placeholder="Card Number"
                maxLength="16"
                value={values.creditNumber}
                onChange={handleChange}
                required
              />
              {errors.creditNumber && (
                <p className="error">{errors.creditNumber}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Enter Expiry Date</span>
              <input
                className="cc-expires"
                type="text"
                name="creditExpires"
                maxLength="5"
                placeholder="MM / YY"
                value={values.creditExpires}
                onChange={handleChange}
                required
              />
              {errors.creditExpires && (
                <p className="error">{errors.creditExpires}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Enter CCV</span>
              <input
                className="cc-cvc"
                type="text"
                pattern="\d*"
                name="creditCvc"
                maxLength="3"
                placeholder="CVC"
                value={values.creditCvc}
                onChange={handleChange}
                required
              />
              {errors.creditCvc && <p className="error">{errors.creditCvc}</p>}
            </div>
            <div className="input-box">
              <span className="details">Total Amount</span>
              <input
                className="amount"
                placeholder="Total"
                id="totalAmount"
                name="totalAmount"
                value=""
                required
                readOnly
              />
            </div>
          </div>
          <button type="submit" className="proceed-to-payment">
            Create Account
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
