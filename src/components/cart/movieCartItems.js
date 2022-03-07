import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";

import { connect } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartAction";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const removeFromCartHandler = (isbn) => {
    dispatch(removeFromCart(isbn));
  };

  return (
    <>
      <Card className="cartCard">
        <Card.Body>
          <img className="cartImage" src={item.movieImage} />
          <h4 className="isbn">ID {item.id}</h4>
          <Button variant="outline-danger" className="cartButton">
            <i class="fas fa-trash-alt"></i>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartItem;
