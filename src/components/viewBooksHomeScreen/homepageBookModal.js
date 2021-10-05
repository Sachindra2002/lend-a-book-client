import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  Button,
  Table,
  Badge,
  Card,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";

import Comments from "../../components/Comments/comments";

//REDUX
import { connect } from "react-redux";

function HomepageBookModal(props) {
  //Destructure props
  const {
    UI: { loading },
    book,
  } = props;

  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.rent_errors
      ? setErrors(props.UI.reservation_errors)
      : setErrors({});
  }, [props.UI.reservation_errors]);

  //Handle Submit
  const handleMakeReservation = async (event) => {
    event.preventDefault();
  };

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  // delete newProps.isVerified;
  // delete newProps.UI;
  // delete newProps.history;

  return loading ? null : book ? (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {book.bookTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ border: "none" }}>
          <Card.Body>
            <Row>
              <Col>
                <img
                  className="book-image"
                  src={book.bookImage}
                  alt="book"
                  style={{ width: 250 }}
                ></img>
              </Col>
              <Col style={{ fontSize: 30, marginLeft: -90 }}>
                <div>{book.bookTitle}</div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  {book.bookSummary}
                </div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  Author : {book.authorName}
                </div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  Publisher : {book.publisher}
                </div>
                <br />
                <Row>
                  <Col>
                    <div>
                      <Button variant="secondary">Read Online</Button>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Button variant="primary">Reserve Now</Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Comments isbn={book.isbn}/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  ) : null;
}

HomepageBookModal.propTypes = {
  book: PropTypes.object,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapActionsTopProp = {};

const mapStateToProps = (state) => ({
  book: state.data.book,
  data: state.data,
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsTopProp)(HomepageBookModal);
