import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

import {
  Card,
  Alert,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import PropTypes from "prop-types";
import dayjs from "dayjs";

import "./viewMovie.scss";
import RemoveMovieModal from "./removeMovieModal";

//REDUX
import { connect } from "react-redux";
import { toggleMovieAvailability } from "../../redux/actions/dataActions";

function ViewMovie(props) {
  //Destructive props
  const {
    UI: { loading },
    movie,
  } = props;

  const [errors, setErrors] = useState({});
  const [movieFileModalShow, setMovieFileModalShow] = useState(false);
  const [removeModalShow, setRemoveModalShow] = useState(false);

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  //Handle toggle activate
  const handleAvailabilityToggle = () => {
    props.toggleMovieAvailability(movie.id);
  };

  return loading ? (
    <p>Loading...</p>
  ) : movie ? (
    <Fragment>
      <Card className="view-book-card">
        <Badge
          pill
          className="book-card-badge"
          variant={movie.isAvailable ? "success" : "danger"}
        >
          {movie.isAvailable ? "Available" : "Unavailable"}
        </Badge>
        <Card.Body>
          <img className="book-image" src={movie.movieImage} alt="movie"></img>

          <hr />

          <ListGroup>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Movie ID</Badge>
              <span> {movie.id}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Movie Title</Badge>
              <span> {movie.movieName}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Director</Badge>
              <span> {movie.director}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">IMDB Rating</Badge>
              <span> {movie.imdbScore}/10</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Genre</Badge>
              <span> {movie.movieGenre}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Date Released</Badge>
              <span> {movie.movieYear}</span>
            </ListGroup.Item>
          </ListGroup>
          <ButtonGroup vertical className="view-book-image-options">
            <Button
              variant="outline-info"
              onClick={() => setMovieFileModalShow(true)}
            >
              View Movie
            </Button>
            <Button
              variant={
                movie.isAvailable ? "outline-warning" : "outline-success"
              }
              onClick={() => handleAvailabilityToggle()}
            >
              {movie.isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
            <Button variant="outline-secondary">Change Image</Button>
            <Button
              variant="outline-danger"
              disabled={!movie.isAvailable}
              onClick={() => setRemoveModalShow(true)}
            >
              Remove Movie
            </Button>
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>
          {" "}
          <small className="text-muted">
            {`Uploaded on ${dayjs(movie.createdAt)
              .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                timeZone: "Asia/Colombo",
              })
              .toString()}`}
          </small>
        </Card.Footer>
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
      <RemoveMovieModal
        id={movie.id}
        show={removeModalShow}
        onHide={() => setRemoveModalShow(false)}
      />
    </Fragment>
  ) : (
    <Alert variant="warning">No Movie Selected</Alert>
  );
}

ViewMovie.propType = {
  movie: PropTypes.object,
  UI: PropTypes.object.isRequired,
  toggleMovieAvailability: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.data.movie,
  UI: state.UI,
});

const mapActionsToProps = {
  toggleMovieAvailability,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewMovie);
