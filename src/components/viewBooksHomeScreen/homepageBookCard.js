import React, { Fragment, useEffect, useState } from "react";
import { Badge, Card, OverlayTrigger, Popover, Modal, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./homepageBookCard.scss";
import { connect } from "react-redux";
import { getBook } from "../../redux/actions/dataActions";

import HomepageBookModal from "./homepageBookModal";

function HomepageBookCard(props) {
  const [homepageBookModalShow, setHomepageBookModalShow] =
    React.useState(false);

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

  const handleBookClick = (id) => {
    if (!props.isBanned) {
      setHomepageBookModalShow(true);
    }
    if (props.isVerified && !props.isBanned) {
      props.getBook(id);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{bookTitle}</Popover.Title>
      <Popover.Content>{bookSummary}</Popover.Content>
    </Popover>
  );

  return (
    <div>
      <OverlayTrigger trigger="#hover" placement="top" overlay={popover}>
        <Card className="homepage-card" onClick={() => handleBookClick(isbn)}>
          <Card.Img variant="top" src={bookImage} className="image" />
        </Card>
      </OverlayTrigger>
      <HomepageBookModal
        history={props.history}
        isVerified={props.isVerified}
        show={homepageBookModalShow}
        onHide={() => setHomepageBookModalShow(false)}
      />
    </div>
  );
}

HomepageBookCard.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  isVerified: state.user.isVerified,
  isBanned: state.user.isBanned,
  authenticated: state.user.authenticated,
  role: state.user.userRole,
  getBook: PropTypes.func.isRequired,
});

const mapActionsTopProp = {
  getBook,
};

export default connect(mapStateToProps, mapActionsTopProp)(HomepageBookCard);
