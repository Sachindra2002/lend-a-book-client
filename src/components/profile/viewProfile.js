import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import AuthenticatedNavbar from "../AuthenticatedNavbar/AuthenticatedNavbar";

function ViewProfile(props) {

  return (
    <>
    <AuthenticatedNavbar/>
      <Container style={{marginTop: 30}}>
        <Row>
          <Col>
            <h1>User Profile</h1>
            <Form style={{width: 300}}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control readOnly type="text" defaultValue={props.email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="email" defaultValue={props.firstName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="email" defaultValue={props.lastName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" defaultValue={props.dob} />
              </Form.Group>
              <Button variant="primary">Update Profile</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

ViewProfile.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
  dob: state.user.dob,
});

export default connect(mapStateToProps, null)(ViewProfile);
