import React from "react";
import { Badge, Card, OverlayTrigger, Popover } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./homepageBookCard.scss";

//REDUX
import { connect } from "react-redux";
import { getBook } from "../../redux/actions/dataActions";

function HomepageBookCard(props) {
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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{bookTitle}</Popover.Title>
      <Popover.Content>{bookSummary}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="#hover" placement="top" overlay={popover}>
      <Card className="homepage-card" onClick={() => handleSetBook(isbn)}>
        <Card.Img variant="top" src={bookImage} className="image" />
      </Card>
    </OverlayTrigger>
  );
}

HomepageBookCard.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapActionsToProp = {
  getBook,
};

export default connect(null, mapActionsToProp)(HomepageBookCard);
