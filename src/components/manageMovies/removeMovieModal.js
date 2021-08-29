import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { removeMovie } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

function RemoveMovieModal(props) {
  const [errors, setErrors] = useState({});

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  //Destructive Props
  const {
    UI: { loading },
  } = props;

  //Handle remove button click
  const handleRemove = async (event) => {
    event.prevenDefault();
    let result = await props.removeMovie(props.id);
    if (result === true) props.onHide();

    const newProps = { ...props };

    //Remoce unwanted props before passing props to modal
    delete newProps.UI;
    delete newProps.removeMovie;
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
            Remove Movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this movie?</p>
          <p
            className="error-text"
            hidden={!errors.deleteMovie}
            style={{ textAlign: "center" }}
          >
            {errors.deleteMovie}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={loading}>
            Remove Movie
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

RemoveMovieModal.propTypes = {
  removeMovie: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  removeMovie,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveMovieModal);
