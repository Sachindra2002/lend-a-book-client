import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";

function CompareBookPricesCard(props) {
  const { title, price, img, link } = props.book;

  return (
    <Card className="book-card">
      <Card.Img variant="top" src={img} className="book-card-image" />
      <Card.Body>
        <span>
          {"   "}
          {title}
        </span>
        <br />
        <Badge variant="secondary">Price</Badge>
        <span>
          {"   "}
          {price}
        </span>
        <br />
        <Button href={link} variant="outline-primary">View Book</Button>
      </Card.Body>
    </Card>
  );
}

export default CompareBookPricesCard;
