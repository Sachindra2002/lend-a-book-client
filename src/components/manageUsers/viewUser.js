import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  Card,
  Row,
  Col,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
  Modal,
  Alert,
} from "react-bootstrap";

import "./viewUser.scss";

//REDUX
import { connect } from "react-redux";
import { setVerified, setBanned } from "../../redux/actions/dataActions";

const image = "";

function ViewUser(props) {
  const {
    UI: { loading },
    user,
  } = props;

  const [isVerified, setIsVerified] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [userImageModalShow, setUserImageModalShow] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVerified(user.isVerified);
      setIsBanned(user.isBanned);
    }
  }, [user]);

  const handleSetVerified = () => {
    props.setVerified(user.email);
    const _verified = isVerified;
    setIsVerified(!_verified);
  };

  const handleSetBanned = () => {
    props.setBanned(user.email);
    const _banned = isBanned;
    setIsBanned(!_banned);
  };

  return (
    <Fragment>
      {loading ? (
        <p>Loading</p>
      ) : user ? (
        <>
          <Card className="view-user-card">
            <Card.Body>
              <Row>
                <Col xs={3}>
                  <Card.Img
                    variant="top"
                    src={`${user.image}`}
                    className="view-user-img"
                  />
                </Col>
                <Col>
                  <Card.Title className="view-user-name">
                    {`${user.firstName} ${user.lastName}`}
                  </Card.Title>
                  <Card.Text className="view-user-email">
                    {user.email}
                  </Card.Text>
                  {isVerified && (
                    <Badge
                      pill
                      variant="primary"
                      className="view-user-pill-badge"
                    >
                      Verified
                    </Badge>
                  )}
                  {!isVerified && (
                    <Badge
                      pill
                      variant="warning"
                      className="view-user-pill-badge"
                    >
                      Not Verified
                    </Badge>
                  )}
                  {isBanned && (
                    <Badge
                      pill
                      variant="danger"
                      className="view-user-pill-badge"
                    >
                      Banned
                    </Badge>
                  )}
                </Col>
              </Row>
              <hr />
              <ListGroup>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Contact Number</Badge>
                  <span>{"  "}{user.phoneNumber}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Date of Birth</Badge>
                  <span>{"  "}{user.dob}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Subscription</Badge>
                  <span>{"  "}{user.Subscription.membershipOption}</span>
                </ListGroup.Item>
              </ListGroup>

              <ButtonGroup vertical className="view-user-image-options">
                <Button
                  variant="outline-info"
                  onClick={() => setUserImageModalShow(true)}
                >
                  {user.image ? "View User Image" : "User image not uploaded"}
                </Button>
              </ButtonGroup>
              <ButtonGroup vertical className="view-user-image-options">
                <Button
                  variant={isVerified ? "outline-secondary" : "outline-info"}
                  onClick={handleSetVerified}
                >
                  {isVerified ? "Remove Verify" : "Set Verified"}
                </Button>
                <Button
                  variant={isBanned ? "outline-danger" : "outline-info"}
                  onClick={handleSetBanned}
                >
                  {isBanned ? "Remove Ban" : "Set Ban"}
                </Button>
              </ButtonGroup>
            </Card.Body>
            <Card.Footer>
              {" "}
              <small className="text-muted">
                {`Registered on ${dayjs(user.createdAt)
                  .format("DD/MM/YYYY h:mm:ss A [GMT]", {
                    timeZone: "Asia/Colombo",
                  })
                  .toString()}`}
              </small>
            </Card.Footer>
          </Card>
          <Modal
            show={userImageModalShow}
            onHide={() => setUserImageModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="view-user-modal-body">
              <img
                src={user.image}
                alt=""
                style={{ objectFit: "contain", width: "100%" }}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Alert variant="warning">No user selected</Alert>
      )}
    </Fragment>
  );
}

ViewUser.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
  setVerified: PropTypes.func.isRequired,
  setBanned: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.data.user,
  UI: state.UI,
});

const mapActionsToProps = {
  setVerified,
  setBanned,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewUser);
