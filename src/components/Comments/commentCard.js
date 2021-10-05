import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Card,
  OverlayTrigger,
  Popover,
  Modal,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { connect } from "react-redux";

import "./commentCard.css";

function CommentCard(props) {
  //const { id, isbn, email, content, createdAt, firstName } = props.comment;
  const {
    UI: { loading },
    user,
    comment,
  } = props;
  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : comment ? (
        <>
          <Card style={{ marginTop: "10px" }}>
            <Card.Body>
              <span style={{ fontFamily: "Calibri" }}>
                {"  "}
                {comment.email}
              </span>
              <span style={{ float: "right", fontFamily: "Calibri" }}>
                {`${dayjs(comment.createdAt)
                  .format("DD/MM/YYYY", {
                    timeZone: "Asia/Colombo",
                  })
                  .toString()}`}{" "}
                {comment.email === user.email && (
                  <span style={{ marginLeft: "10px" }}>
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </span>
                )}
              </span>
              <br />
              <br />
              <span>
                {"  "}
                {comment.content}
              </span>
              <span style={{ float: "right" }}>
                <i class="fas fa-heart"></i>
              </span>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </Fragment>
  );
}

CommentCard.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProp = {};

export default connect(mapStateToProps, mapActionsToProp)(CommentCard);
