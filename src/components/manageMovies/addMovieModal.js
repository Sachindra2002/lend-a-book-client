import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { addMovie } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

//Import consts
import { MOVIE_TYPES, AGE } from "../../utils/consts";

function AddMovieModal(props) {
  const [movieTitle, setMovieTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imdb, setImdb] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [is18, setIs18] = useState("");
  const [summary, setSummary] = useState("");
  const [imageFile, setImageFile] = useState();
  const [movieFile, setMovieFile] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleAddMovie = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("movieTitle", movieTitle);
    data.append("quantity", quantity);
    data.append("director", director);
    data.append("imdb", imdb);
    data.append("year", year);
    data.append("genre", genre);
    data.append("is18", is18);
    data.append("summary", summary);
    data.append("imageFile", imageFile);
    data.append("movieFile", movieFile);

    //Add Movie to the backend
    let result = await props.addMovie(data);

    //f no erros are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      clearFields();
    }
  };

  //Method to clear all form fields and set them to default
  const clearFields = () => {
    setMovieTitle("");
    setQuantity("");
    setDirector("");
    setYear("");
    setIs18("");
    setSummary("");
    setGenre(MOVIE_TYPES[0].id);
    props.clearErrors();
  };

  const newProps = { ...props };

  //Dropdown select for movie genre
  const genreDropdownMarkup = MOVIE_TYPES.map((type, index) => (
    <option key={index} value={type.id}>
      {type.name}
    </option>
  ));

  //Dropdown to select is book is 18+ or not
  const ageDropdownMarkup = AGE.map((type, index) => (
    <option key={index} value={type.id}>
      {type.name}
    </option>
  ));

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.addMovie;
  delete newProps.clearErrors;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // onExit={clearFields}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddMovie}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                required
              />
              <p className="error-text" hidden={!errors.movieTitle}>
                {errors.movieTitle}
              </p>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Movie Director</Form.Label>
              <Form.Control
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>IMDB Rating</Form.Label>
              <Form.Control
                type="text"
                value={imdb}
                onChange={(e) => setImdb(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                {genreDropdownMarkup}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Is Book 18+</Form.Label>
              <Form.Control
                as="select"
                value={is18}
                onChange={(e) => setIs18(e.target.value)}
              >
                {ageDropdownMarkup}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Quantity </Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Summary of the Movie</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Upload Cover Image of Movie</Form.Label>
              <Form.File
                id="custom-file"
                label="Upload Cover Image"
                accept="image/png, image/jpeg"
                onChange={(event) => setImageFile(event.target.files[0])}
                custom
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Upload mp4 file of Movie </Form.Label>
              <Form.File
                id="custom-file"
                label="Upload mp4 File"
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(event) => setMovieFile(event.target.files[0])}
                custom
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
            <span>
              <i className="fas fa-plus-square fa-plus-square-add"></i>
              {loading ? "Adding Movie..." : "Add Movie"}
            </span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

AddMovieModal.propTypes = {
  addMovie: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addMovie,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(AddMovieModal);
