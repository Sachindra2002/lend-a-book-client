import React from "react";
import { Badge, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";


//CSS
import "./bookCard.scss";

//REDUX
import { connect } from "react-redux";
import { getBook } from "../../redux/actions/dataActions";

function BookCard(props) {
  const {
    isbn,
    bookName,
    authorName,
    bookGenre,
    is18,
    bookTitle,
    publisher,
    bookYear,
    bookImage,
    bookFile,
    isAvailableOnline,
    isAvailable,
    bookSummary,
    createdAt,
  } = props.book;

  const handleSetBook = (id) => {
    props.getBook(id);
  };

  return (
    <Card className="book-card" onClick={() => handleSetBook(isbn)}>
      <Card.Img variant="top" src={bookImage} className="book-card-image" />
      <Badge
        pill
        className="book-card-badge"
        variant={isAvailable ? "success" : "danger"}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
      <Card.Body>
        <span>
          {"   "}
          {bookTitle}
        </span><br/>
        <Badge variant="secondary">ISBN</Badge>
        <span>
          {"   "}
          {isbn}
        </span>
        <br />      
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`Uploaded on ${dayjs(createdAt)
          .format("DD/MM/YYYY h:mm:ss A [GMT]", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</small>
      </Card.Footer>
    </Card>
  );
}

BookCard.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getBook,
};

export default connect(null, mapActionsToProps)(BookCard);
