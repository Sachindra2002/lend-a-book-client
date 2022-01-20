import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { addBookFromCSV } from "../../redux/actions/dataActions";
import { connect } from "react-redux";

function CSVBookCard(props) {
  const {
    isbn,
    bookName,
    bookSummary,
    bookGenre,
    authorName,
    bookYear,
    Publisher,
    isAvailable,
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
      Publisher,
      isAvailable,
      is18,
    };

    let results = await props.addBookFromCSV(book);
  };

  return (
    <Card className="book-card" style={{ height: 400 }}>
      <Card.Img
        variant="top"
        src="http://localhost:5000/books/addBook.jpg"
        className="book-card-image"
      />
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
            <Button onClick={handleAddBook} variant="outline-success" style={{ marginTop: 10 }}>
              Add Book
            </Button>
          </Col>
          <Col>
            <Button variant="outline-info" style={{ marginTop: 10 }}>
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
  );
}

CSVBookCard.propTypes = {
  addBookFromCSV: PropTypes.func.isRequired,
  UI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addBookFromCSV,
};

export default connect(mapStateToProps, mapActionsToProps)(CSVBookCard);
