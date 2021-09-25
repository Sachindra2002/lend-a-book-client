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
  const { id, isbn, email, content, createdAt } = props.comment;

  return (
    <Card style={{marginTop: "10px"}}>
      <Card.Body>
        <span style={{fontFamily: "Calibri"}}>{"  "}{email}</span><span style={{float: "right", fontFamily: "Calibri"}}>{`${dayjs(createdAt)
          .format("DD/MM/YYYY", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</span><br/><br/>
        <span>{"  "}{content}</span>
        <span style={{float: "right"}}><i class="fas fa-heart"></i></span>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProp = {};

export default connect(mapStateToProps, mapActionsToProp)(CommentCard);
