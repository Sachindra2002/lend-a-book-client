import React, {useState} from "react";
import { Container, Alert, Badge, Modal, Button } from "react-bootstrap";
import AuthenticatedNavbar from "../../components/AuthenticatedNavbar/AuthenticatedNavbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./memberHome.css";

function MemberHome(props) {
  const [show, setShow] = useState(false);
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
        <Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>
        <Modal
          show={show}
          size="lg"
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title>Helooo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Test Modal</p>
          </Modal.Body>
        </Modal>
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
