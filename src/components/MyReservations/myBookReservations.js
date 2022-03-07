import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Container,
  Table,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

import MyBookReservationRow from "./myBookReservationRow";
import { connect } from "react-redux";
import { getMyBookReservations } from "../../redux/actions/dataActions";

import AuthenticatedNavbar from "../AuthenticatedNavbar/AuthenticatedNavbar";

function MyBookReservations(props) {
  const [activeBookReservations, setActiveBookReservations] = useState([]);
  const [previousBookReservations, setPreviousBookReservations] = useState([]);

  const [reservation, setReservationObject] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const setReservation = (reservation) => {
    setReservationObject(reservation);
    setModalShow(true);
  };

  useEffect(() => {
    props.getMyBookReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Destructure props
  const {
    data: { reservations, loading },
  } = props;

  useEffect(() => {
    if (reservations) {
      setActiveBookReservations(
        reservations.filter((e) => e.status !== "returned")
      );
      setPreviousBookReservations(
        reservations.filter((e) => e.status === "returned")
      );
    }
  }, [reservations]);

  const activeReservationBookMarkup = activeBookReservations.map(
    (reservation) => (
      <MyBookReservationRow
        key={reservation.id}
        reservation={reservation}
        onView={setReservation}
      />
    )
  );

  const previousReservationBookMarkup = previousBookReservations.map(
    (reservation) => (
      <MyBookReservationRow
        key={reservation.id}
        reservation={reservation}
        onView={setReservation}
      />
    )
  );

  return (
    <>
      <div>
        <AuthenticatedNavbar />
        <Container style={{ textAlign: "center" }}>
          <h2 className="title" style={{ marginTop: 80 }}>
            Book Reservations
          </h2>
        </Container>
      </div>
      <Container>
        <h2 className="rent-title" style={{ marginTop: 80 }}>
          Active Reservations
        </h2>
        <Card style={{ width: "70rem", height: "auto" }}>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Book / Books</th>
                  <th>Reserve Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {!loading && activeBookReservations.length > 0 ? (
                  activeReservationBookMarkup
                ) : activeBookReservations.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">
                        You have no active reservations!
                      </Alert>
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
        <h5 className="rent-title" style={{ marginTop: 80 }}>
          Previous Reservations
        </h5>
        <Card style={{ marginBottom: 20, width: "70rem", height: "auto" }}>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Book / Books</th>
                  <th>Reserve Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {!loading && previousBookReservations.length > 0 ? (
                  previousReservationBookMarkup
                ) : previousBookReservations.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">
                        You have no previous reservations!
                      </Alert>
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
      </Container>
      {/* {modalShow && (
        <ViewReservationModal
          reservation={reservation}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )} */}
    </>
  );
}

MyBookReservations.propTypes = {
  getMyBookReservations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getMyBookReservations,
};

export default connect(mapStateToProps, mapActionsToProps)(MyBookReservations);
