import React from "react";
import { Button, Card } from "react-bootstrap";
import "./cart.css";

const CartItem = ({ item }) => {
  return (
    <>
      <Card className="cartCard">
        <Card.Body>
          <img className="cartImage" src={item.image} />
          <h4 className="isbn">ISBN {item.isbn}</h4>
          <Button variant="outline-danger" className="cartButton">
            <i class="fas fa-trash-alt"></i>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartItem;
