import React from "react";
import { Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./DashboardNavbar.scss";

//Redux
import { connect } from "react-redux";
import { setDashboard } from "../../redux/actions/uiActions";

const DashboardNavbar = (props) => {
  const {
    UI: { dashboard },
  } = props;

  //Manage user clicks on dashboard button
  const handleSetDashboard = (event) => {
    const id = event.target.id;
    console.log("Click", id);
    if (id === "user-dashboard-button" || id === "user-dashboard-icon") {
      props.setDashboard(0);
    } else if (id === "book-dashboard-button" || id === "book-dashboard-icon") {
      props.setDashboard(1);
    } else if (
      id === "movie-dashboard-button" ||
      id === "movie-dashboard-icon"
    ) {
      props.setDashboard(2);
    } else if (
      id === "reservation-dashboard-button" ||
      id === "reservation-dashboard-icon"
    ) {
      props.setDashboard(3);
    } else if (
      id === "compare-book-dashboard-button" ||
      id === "compare-book-dashboard-icon"
    ) {
      props.setDashboard(5);
    }
  };

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block sidebar"
        activeKey="/homepage"
        onSeeked={(selectKey) => alert(`selected ${selectKey}`)}
      >
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 0 && "sidebar-button-active"
            }`}
            size="lg"
            id="user-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="user-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-users icon"></i>
              Users
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 1 && "sidebar-button-active"
            }`}
            size="lg"
            id="book-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="book-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-book icon"></i>
              Books
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 2 && "sidebar-button-active"
            }`}
            size="lg"
            id="movie-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="movie-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-film icon"></i>
              Movies
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 3 && "sidebar-button-active"
            }`}
            size="lg"
            id="reservation-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="reservation-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-file-invoice-dollar icon"></i>
              Reservations / Books
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 4 && "sidebar-button-active"
            }`}
            size="lg"
            id="reservation-dashboard-button"
            // onClick={handleSetDashboard}
          >
            <span id="reservation-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-file-invoice-dollar icon"></i>
              Reservations / Movies
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 5 && "sidebar-button-active"
            }`}
            size="lg"
            id="compare-book-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="compare-book-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fa fa-money icon"></i>
              Compare Book Prices
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 6 && "sidebar-button-active"
            }`}
            size="lg"
            id="reservation-dashboard-button"
            // onClick={handleSetDashboard}
          >
            <span id="reservation-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fa fa-money icon"></i>
              Compare Movie Prices
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 7 && "sidebar-button-active"
            }`}
            size="lg"
            id="reservation-dashboard-button"
            // onClick={handleSetDashboard}
          >
            <span id="reservation-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fa fa-cart-plus icon"></i>
              Puchase Books
            </span>
          </Button>
        </Nav.Item>
      </Nav>
    </>
  );
};

DashboardNavbar.propType = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  setDashboard,
};

export default connect(mapStateToProps, mapActionsToProps)(DashboardNavbar);
