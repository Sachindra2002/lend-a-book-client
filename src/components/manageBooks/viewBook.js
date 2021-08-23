import React, { Fragment, useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";

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

import "./viewBook.scss";

//REDUX
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function ViewBook(props) {
  //Destructive props
  const {
    UI: { loading },
    book,
  } = props;

  const [errors, setErrors] = useState({});
  const [bookFileModalShow, setBookFileModalShow] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  //Handle toggle activate
  const handleAvailabilityToggle = () => {
    props.toggleVehicleAvailability(book.isbn);
  };

  return loading ? (
    <p>Loading...</p>
  ) : book ? (
    <Fragment>
      <Card className="view-book-card">
        <Badge
          pill
          className="book-card-badge"
          variant={book.isAvailable ? "success" : "danger"}
        >
          {book.isAvailable ? "Available" : "Unavailable"}
        </Badge>
        <Card.Body>
          <img className="book-image" src={book.bookImage} alt="book"></img>

          <hr />

          <ListGroup>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">ISBN</Badge>
              <span> {book.isbn}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Book Title</Badge>
              <span> {book.bookTitle}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Author</Badge>
              <span> {book.authorName}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Publisher</Badge>
              <span> {book.publisher}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Genre</Badge>
              <span> {book.bookGenre}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Date Released</Badge>
              <span> {book.bookYear}</span>
            </ListGroup.Item>
          </ListGroup>

          <ButtonGroup vertical className="view-book-image-options">
            <Button
              variant="outline-info"
              onClick={() => setBookFileModalShow(true)}
            >
              View Book
            </Button>
            <Button
              variant={book.isAvailable ? "outline-warning" : "outline-success"}
              onClick={() => handleAvailabilityToggle()}
            >
              {book.isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
            <Button variant="outline-secondary">Change Image</Button>
            <Button
              variant="outline-danger"
              disabled={!book.isAvailable}
              //   onClick={() => setRemoveModalShow(true)}
            >
              Remove Book
            </Button>
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>
          {" "}
          <small className="text-muted">
            {`Uploaded on ${dayjs(book.createdAt)
              .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                timeZone: "Asia/Colombo",
              })
              .toString()}`}
          </small>
        </Card.Footer>
      </Card>
      <Modal
        show={bookFileModalShow}
        onHide={() => setBookFileModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>{book.bookTitle}</Modal.Header>
        <Modal.Body>
          <div className="Example__container__document">
            <Document
              centered
              file={book.bookFile}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <button
                className="prev-page"
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Previous
              </button>
              <button
                className="prev-page"
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  ) : (
    <Alert variant="warning">No Book Selected</Alert>
  );
}

ViewBook.propType = {
  book: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  book: state.data.book,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ViewBook);
