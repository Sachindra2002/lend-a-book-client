import React from "react";
import { Badge, Card } from "react-bootstrap";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import "./userCard.scss";

//REDUX
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/dataActions";

function userCard(props) {
  const { firstName, lastName, email, isVerified, isBanned, createdAt } =
    props.user;

  const handleSetUser = (email) => {
    props.getUser(email);
  };

  return (
    <Card className="user-card" onClick={() => handleSetUser(email)}>
      <Card.Body>
        <Card.Title className="user-card-title">{`${firstName} ${lastName}`}</Card.Title>
        <Badge
          pill
          variant={
            isBanned
              ? "danger"
              : !isVerified
              ? "secondary"
              : isVerified
              ? "success"
              : "primary"
          }
          className="user-card-badge"
        >
          {isBanned ? "Banned" : !isVerified ? "Not verified" : "Verified"}
        </Badge>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`Registered on ${dayjs(createdAt)
          .format("DD/MM/YYYY h:mm:ss A [GMT]", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</small>
      </Card.Footer>
    </Card>
  );
}

userCard.propType = {
  getUser: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getUser,
};

export default connect(null, mapActionsToProps)(userCard);
