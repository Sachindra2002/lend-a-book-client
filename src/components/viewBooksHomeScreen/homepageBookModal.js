import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
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
import { addToCart } from "../../redux/actions/cartAction";
import { toast } from "react-toastify";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function HomepageBookModal(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  //Destructure props
  const {
    UI: { loading },
    book,
  } = props;

  const [bookFileModalShow, setBookFileModalShow] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [errors, setErrors] = useState({});

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

  const SuccessToaster = () => {
    toast.success("Book added to cart successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

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

  const addToCartHandler = () => {
    dispatch(addToCart(book.isbn, 1));
    SuccessToaster();
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
                      <Button
                        variant="secondary"
                        onClick={() => setBookFileModalShow(true)}
                      >
                        Read Online
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Button variant="primary" onClick={addToCartHandler}>
                        Reserve Now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Comments isbn={book.isbn} />
              </Col>
            </Row>
          </Card.Body>
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
                  Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                  {numPages || "--"}
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
