import React, { useState } from "react";
import { Badge, Button, Card, Col, Row, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";

//REDUX
import { connect } from "react-redux";
import { addBookFromMongo } from "../../redux/actions/dataActions";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function BookRepoCard(props) {
  const [bookModalShow, setBookModalShow] = useState(false);
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

  const {
    _id,
    isbn,
    bookName,
    bookSummary,
    bookGenre,
    authorName,
    bookYear,
    publisher,
    isAvailable,
    bookFile,
    bookImage,
    is18,
  } = props.book;

  const handleAddBook = async (event) => {
    const book = {
      isbn,
      bookName,
      bookSummary,
      bookGenre,
      authorName,
      bookYear,
      Publisher: publisher,
      isAvailable,
      bookFile,
      bookImage,
      is18,
    };

    let results = await props.addBookFromMongo(book);
  };

  return (
    <div>
      <Card className="book-card" style={{ height: 400 }}>
        <Card.Img variant="top" src={bookImage} className="book-card-image" />
        <Card.Body>
          <span>
            {"   "}
            {bookName}
          </span>
          <br />
          <Badge variant="secondary">ISBN</Badge>
          <span>
            {"   "}
            {isbn}
          </span>
          <br />
          <Row>
            <Col>
              <Button
                onClick={handleAddBook}
                variant="outline-success"
                style={{ marginTop: 10 }}
              >
                Add Book
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setBookModalShow(true)}
                variant="outline-info"
                style={{ marginTop: 10 }}
              >
                View Book
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Published on ${dayjs(bookYear)
            .format("DD/MM/YYYY", {
              timeZone: "Asia/Colombo",
            })
            .toString()}`}</small>
        </Card.Footer>
      </Card>
      <Modal
        show={bookModalShow}
        onHide={() => setBookModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {bookName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Row>
                <Col>
                  <img
                    className="book-image"
                    src={bookImage}
                    alt="book"
                    style={{ width: 250 }}
                  ></img>
                </Col>
                <Col style={{ fontSize: 30, marginLeft: -90 }}>
                  <div>{bookName}</div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    {bookSummary}
                  </div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    Author : {authorName}
                  </div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    Publisher : {publisher}
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
                  </Row>
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
            <Modal.Header closeButton>{bookName}</Modal.Header>
            <Modal.Body>
              <div className="Example__container__document">
                <Document
                  centered
                  file={bookFile}
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
    </div>
  );
}

BookRepoCard.propTypes = {
  addBookFromMongo: PropTypes.func.isRequired,
  UI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addBookFromMongo,
};

export default connect(mapStateToProps, mapActionsToProps)(BookRepoCard);
