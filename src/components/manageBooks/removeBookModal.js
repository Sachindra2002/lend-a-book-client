import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

function RemoveBookModal(props) {
  const [errors, setErrors] = useState({});

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  //Destructive props
  const {
    UI: { loading },
  } = props;

  //Handle remove button click
  const handleRemove = async (event) => {
    event.preventDefault();
    let result = await props.removeBook(props.id);
    if (result === true) props.onHide();
  };

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.removeBook;
  delete newProps.id;
  delete newProps.clearErrors;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => props.clearErrors()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Remove Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this book?</p>
        <p
          className="error-text"
          hidden={!errors.deleteBook}
          style={{ textAlign: "center" }}
        >
          {errors.deleteBook}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={loading}>
          Remove Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RemoveBookModal.propTypes = {
  removeBook: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  removeBook,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveBookModal);
