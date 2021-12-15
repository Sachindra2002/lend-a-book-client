import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CartItem from "./CartItem";
import "./cart.css";

import { connect } from "react-redux";
import AuthenticatedNavbar from "../AuthenticatedNavbar/AuthenticatedNavbar";
import { reserveBooks } from "../../redux/actions/dataActions";
import { removeFromCart } from "../../redux/actions/cartAction";

function CartScreen(props) {
  const [reservationDate, setReservationDate] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { cartItems } = cart;
  const books = { cartItems };

  //update state with errors
  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.error);
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const getCartCount = () => {
    return cartItems.length;
  };

  //Create the minimum pickup and delivery date
  const minDate = () => {
    const now = dayjs();

    return now.add(1, "day").format("YYYY-MM-DD");
  };

  const getTotal = () => {
    console.log(user);
    if (user.Subscription.membershipOption === "bronze") {
      const price = cartItems.length * 50;
      return price;
    } else {
      const price = 50;
      return price;
    }
  };

  const removeFromCartHandler = (isbn) => {
    dispatch(removeFromCart(isbn));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      reservationDate: reservationDate,
      charge: getTotal(),
      books: books,
    };
    console.log(data);

    props.reserveBooks(data, props.history);
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <div className="header">Your Cart</div>
      <div className="cards_checkout">
        {cartItems.length === 0 ? (
          <div className="empty">Cart is empty</div>
        ) : (
          cartItems.map((item) => <CartItem key={item.product} item={item} />)
        )}
      </div>
      <div className="checkout">
        <div className="chekout_title">Checkout</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total Cost</Form.Label>
            {loading ? (
              <p>Loading</p>
            ) : user.Subscription ? (
              <Form.Control value={getTotal()} required readOnly />
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Reservation Date</Form.Label>
            <Form.Control
              onChange={(event) => setReservationDate(event.target.value)}
              min={minDate()}
              type="date"
              required
            />
          </Form.Group>
          <Button type="submit" className="button_checkout">
            CHECKOUT
          </Button>
        </Form>
      </div>
    </div>
  );
}

CartScreen.propTypes = {
  reserveBooks: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  reserveBooks,
};

export default connect(mapStateToProps, mapActionsToProps)(CartScreen);
