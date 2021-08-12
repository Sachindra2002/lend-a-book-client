import React from "react";
import { Container, Alert } from "react-bootstrap";
import AuthenticatedNavbar from "../../components/AuthenticatedNavbar/AuthenticatedNavbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./memberHome.css";

function MemberHome(props) {
  var d = new Date();
  var time = d.getHours();

  if (time < 12) {
    //document.getElementById('greeting').innerText = "Good Morning";
  } else if (time > 12) {
    //document.getElementById('greeting').innerText = "Good Afternoon";
  } else if (time > 15) {
    //document.getElementById('greeting').innerText = "Good Evening";
  }

  return (
    <>
      <AuthenticatedNavbar />
      <div>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={props.isVerified}
        >
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
        </Alert>
      </div>
      <div id="greeting"></div> {props.firstName}
    </>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  isVerified: state.user.isVerified,
});

MemberHome.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(MemberHome);
