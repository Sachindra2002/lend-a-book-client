import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Card,
  OverlayTrigger,
  Popover,
  Modal,
  Alert,
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/dataActions";

import "./commentCard.css";

function CommentCard(props) {
  //const { id, isbn, email, content, createdAt, firstName } = props.comment;
  const {
    UI: { loading },
    user,
    comment,
  } = props;

  const handleDelete = async (event) => {
    //Add comment to the backend
    let result = await props.deleteComment(comment.id);
  };

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
                  <Button
                    onClick={handleDelete}
                    style={{ width: 50, marginLeft: 20 }}
                    variant="outline-danger"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </Button>
                )}
              </span>
              <br />
              <br />
              <span>
                {"  "}
                {comment.content}
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
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProp = {
  deleteComment
};

export default connect(mapStateToProps, mapActionsToProp)(CommentCard);
