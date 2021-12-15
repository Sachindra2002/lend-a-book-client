import React, { useState } from "react";
import {
  Container,
  Alert,
  Badge,
  Modal,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import AuthenticatedNavbar from "../../components/AuthenticatedNavbar/AuthenticatedNavbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./memberHome.css";

import Footer from "../../components/homepageFooter/Footer";

import ManageHomepageBooks from "../../components/viewBooksHomeScreen/manageHomepageBooks";
import ManageHomepageMovies from "../../components/viewMoviesHomeScreen/manageHomepageMovies";

function MemberHome(props) {
  const [show, setShow] = useState(false);
  var d = new Date();
  var time = d.getHours();
  var greeting = "";

  if (time < 12) {
    greeting = "Good Morning";
  } else if (time > 12 < 15) {
    greeting = "Good Afternoon";
  } else if (time > 15) {
    greeting = "Good Evening";
  }

  return (
    <>
      <AuthenticatedNavbar />
      <div>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={props.isVerified}
          style={{ marginLeft: "10px", marginRight: "10px"}}
        >
          {`Hello ${props.firstName} ${props.lastName}! `}
          You are <b>not verified,</b> You will not be able to do any
          reservations until human verification is passed.{" "}
        </Alert>
      </div>
      <div className="greeting-name">
        Welcome Back, {props.firstName}
      </div>
      <Container fluid>
        <>
          <Col id="page-content-wrapper">
            <ManageHomepageBooks />
          </Col>
          <Col id="page-content-wrapper">
            <ManageHomepageMovies />
          </Col>
        </>
      </Container>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  isVerified: state.user.isVerified,
});

MemberHome.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(MemberHome);
