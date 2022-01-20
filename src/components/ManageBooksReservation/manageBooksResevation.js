import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Table,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

//COMPONENTS
import BookReservationRow from "./bookReservationRow";

//REDUX
import { connect } from "react-redux";
import { getAllBookReservations } from "../../redux/actions/dataActions";

function ManageBooksReservation(props) {
  const [bookReservation, setBookReservationObject] = useState({});
  const [bookReservationPool, setBookReservationPool] = useState([]);

  const setBookReservation = (bookReservation) => {
    setBookReservationObject(bookReservation);
  };

  //Get book reservation information when component loads
  useEffect(() => {
    props.getAllBookReservations();
  }, []);

  //Destructive props
  const {
    data: { bookReservations, loading },
  } = props;

  //Set book reservations object on component load
  useEffect(() => {
    if (bookReservations) {
      setBookReservationPool(bookReservations);
    }
  }, [bookReservations]);

  //Handle status change of a rent
  const changeStatus = (_status) => {
    const allBookReservations = bookReservations.map(
      (bookReservation_obj) => bookReservation_obj
    );
    let result;
    if (!(_status.toLowerCase() === "all")) {
      result = allBookReservations.filter((item) => {
        if (item.status.toLowerCase() === _status.toLowerCase()) return item;
        else return null;
      });
    } else result = allBookReservations;
    setBookReservationPool(result);
  };

  //Map book reservations into components
  let bookReservationMarkup = bookReservationPool.map((bookReservation) => (
      <BookReservationRow key={bookReservation.id} bookReservation = {bookReservation}/>
  ))

  //Flatten object attributes to avoid nested objects when filtering
  const flatten = (object) => {
    return Object.assign(
      {},
      ...(function _flatten(objectBit, path = "") {
        return [].concat(
          ...Object.keys(objectBit).map((key) =>
            typeof objectBit[key] === "object"
              ? _flatten(objectBit[key], `${key}`)
              : { [`${key}`]: objectBit[key] }
          )
        );
      })(object)
    );
  };

  return (
    <div className="manage-reservations">
      <Card style={{ marginBottom: 20 }}>
        <Card.Body>
          <Card.Title>Search Book Reservations</Card.Title>
          <Card.Body>
            <Row>
              <Col xs={5}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for rents"
                    aria-label="Search for rents"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Col>
              <Col xs={7}>
                <Button
                  className="search-user-button"
                  variant="outline-primary"
                  onClick={() => {
                    changeStatus("all");
                  }}
                >
                  All
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-secondary"
                  onClick={() => {
                    changeStatus("pending");
                  }}
                >
                  Pending
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-warning"
                  onClick={() => {
                    changeStatus("collected");
                  }}
                >
                  Collected
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-success"
                  onClick={() => {
                    changeStatus("returned");
                  }}
                >
                  Returned
                </Button>{" "}
              </Col>
            </Row>
          </Card.Body>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table striped bordered hover className="manage-equipment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reserved Date</th>
                <th>Return Date</th>
                <th>Book/Books</th>
                <th>Customer</th>
                <th>Reservation Charges</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && bookReservationPool.length > 0 ? (
                bookReservationMarkup
              ) : bookReservationPool.length === 0 && !loading ? (
                <tr>
                  <td colSpan="8">
                    <Alert variant="warning">No reservations found!</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">Loading!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

ManageBooksReservation.propTypes = {
  getAllBookReservations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllBookReservations,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ManageBooksReservation);
