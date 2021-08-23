import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { addBook } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

//Import consts
import { BOOK_TYPES, AGE } from "../../utils/consts";

function AddBookModal(props) {
  const [isbn, setIsbn] = useState("");
  const [bookName, setBookName] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [is18, setIs18] = useState("");
  const [summary, setSummary] = useState("");
  const [imageFile, setImageFile] = useState();
  const [bookFile, setBookFile] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  //When errors are updated the component is re-rendered to diaply errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleAddBook = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("isbn", isbn);
    data.append("bookName", bookName);
    data.append("title", title);
    data.append("authorName", authorName);
    data.append("publisher", publisher);
    data.append("year", year);
    data.append("genre", genre);
    data.append("is18", is18);
    data.append("summary", summary);
    data.append("imageFile", imageFile);
    data.append("bookFile", bookFile);

    //Add Book to the backend
    let result = await props.addBook(data);

    //If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      clearFields();
    }
  };

  //Method to clear all form fields and set them to default
  const clearFields = () => {
    setIsbn("");
    setBookName("");
    setTitle("");
    setAuthorName("");
    setPublisher("");
    setYear("");
    setIs18("");
    setSummary("");
    setGenre(BOOK_TYPES[0].id);
    props.clearErrors();
  };

  const newProps = { ...props };

  //Dropdown select for book genre
  const genreDropdownMarkup = BOOK_TYPES.map((type, index) => (
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
  delete newProps.addBook;
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
        <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddBook}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                value={isbn}
                className={errors.isbn ? "is-invalid" : null}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
              <p className="error-text" hidden={!errors.isbn}>
                {errors.isbn}
              </p>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name of Book</Form.Label>
              <Form.Control
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Title of Book</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name of Publisher</Form.Label>
              <Form.Control
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
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
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Summary of the Book</Form.Label>
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
              <Form.Label>Upload Cover Image of Book</Form.Label>
              <Form.File
                id="custom-file"
                label="Upload Cover Image"
                accept="image/png, image/jpeg"
                onChange={(event) => setImageFile(event.target.files[0])}
                custom
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Upload PDF file of Book </Form.Label>
              <Form.File
                id="custom-file"
                label="Upload PDF File"
                accept="application/pdf"
                onChange={(event) => setBookFile(event.target.files[0])}
                custom
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
            <span>
              <i className="fas fa-plus-square fa-plus-square-add"></i>
              {loading ? "Adding Book..." : "Add Book"}
            </span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

AddBookModal.propTypes = {
  addBook: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addBook,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(AddBookModal);
