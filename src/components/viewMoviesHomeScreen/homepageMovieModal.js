import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
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

//REDUX
import { connect } from "react-redux";

function HomepageMovieModal(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  //Destructure props
  const {
    UI: { loading },
    movie,
  } = props;

  const [errors, setErrors] = useState({});
  const [movieFileModalShow, setMovieFileModalShow] = useState(false);

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

  // Remove unwanted props before passing props to modal
  delete newProps.isVerified;
  delete newProps.UI;
  delete newProps.history;

  return loading ? null : movie ? (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {movie.movieName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ border: "none" }}>
          <Card.Body>
            <Row>
              <Col>
                <img
                  className="book-image"
                  src={movie.movieImage}
                  alt="book"
                  style={{ width: 250 }}
                ></img>
              </Col>
              <Col style={{ fontSize: 30, marginLeft: -90 }}>
                <div>{movie.movieName}</div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  {movie.movieSummary}
                </div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  Director : {movie.director}
                </div>
                <br />
                <div style={{ fontSize: 17, marginTop: -30 }}>
                  IMDB : {movie.imdbScore}
                </div>
                <br />
                <Row>
                  <Col>
                    <div>
                      <Button variant="secondary" onClick={() => setMovieFileModalShow(true)}>Watch Online</Button>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Button variant="primary" >
                        Reserve Now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Modal
        show={movieFileModalShow}
        onHide={() => setMovieFileModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>{movie.movieName}</Modal.Header>
        <Modal.Body>
          <div>
            <ReactPlayer
              controls
              url={movie.movieFile}
              style={{ height: 100 }}
            />
          </div>
        </Modal.Body>
      </Modal>
      </Modal.Body>
    </Modal>
  ) : null;
}

HomepageMovieModal.propTypes = {
  movie: PropTypes.object,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapActionsTopProp = {};

const mapStateToProps = (state) => ({
  movie: state.data.movie,
  data: state.data,
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsTopProp)(HomepageMovieModal);
