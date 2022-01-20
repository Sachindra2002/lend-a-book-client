import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";
import { getAllBookReservations } from "../../redux/actions/dataActions";
import { changeReservationStatus } from "../../redux/actions/dataActions";

function BookReservationRow(props) {
  const [status, setStatus] = useState("pending");
  const [bookReservation, setBookReservation] = useState(null);

  //Get reservation status when component loads
  useEffect(() => {
    if (bookReservation) setStatus(bookReservation.status);
    // eslint-disable-next-line
  }, []);

  //Wehen reservation object changes state for re-render
  useEffect(() => {
    if (props.bookReservation) {
      setBookReservation(props.bookReservation);
      setStatus(props.bookReservation.status);
    }
  }, [props.bookReservation]);

  const { onView } = props;

  const handleChangeStatus = (status) => {
    props.changeReservationStatus(bookReservation.id, status);
    setStatus(status);
    //props.getAllRents();
  };

  let statusMarkup =
    status === "pending" ? (
      <Badge pill variant="secondary">
        Pending Collection
      </Badge>
    ) : status === "collected" ? (
      <Badge pill variant="collected">
        Collected
      </Badge>
    ) : (
      <Badge pill variant="success">
        Returned
      </Badge>
    );

  //Dynamc markup for actions
  let actionsmarkup =
    status === "pending" ? (
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => handleChangeStatus("collected")}
      >
        Set Collected
      </Button>
    ) : status === "collected" ? (
      <Button
        variant="outline-success"
        size="sm"
        onClick={() => handleChangeStatus("returned")}
      >
        Set Returned
      </Button>
    ) : null;

  return (
    <>
      {bookReservation && (
        <tr>
          <td>{bookReservation.id}</td>
          <td>
            {dayjs(bookReservation.reservationDate)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            {dayjs(bookReservation.returnDate)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            <Button variant="outline-info">View Books</Button>
          </td>
          <td>
            <Button variant="outline-info">View Customer</Button>
          </td>
          <td>{bookReservation.charges} LKR</td>
          <td>{statusMarkup}</td>
          <td>{actionsmarkup}</td>
        </tr>
      )}
    </>
  );
}

BookReservationRow.propTypes = {
  bookReservation: PropTypes.func.isRequired,
  changeReservationStatus: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getAllBookReservations,
  changeReservationStatus,
};

export default connect(null, mapActionsToProps)(BookReservationRow);
