import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Dashboard.scss";

import AuthenticatedNavbar from "../../components/AuthenticatedNavbar/AuthenticatedNavbar";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

import ManageUsers from "../../components/manageUsers/manageUsers";
import ViewUser from "../../components/manageUsers/viewUser";

import ManageBooks from "../../components/manageBooks/manageBooks";
import ViewBook from "../../components/manageBooks/viewBook";

import ManageMovies from "../../components/manageMovies/manageMovies";
import ViewMovie from "../../components/manageMovies/viewMovie";

import ManageBookReservation from "../../components/ManageBooksReservation/manageBooksResevation";

import ManageCompareBookPrices from "../../components/CompareBookPrices/manageCompareBookPrices";

import ManagePurchaseBooks from "../../components/PurchaseBooks/managaPurchaseBooks";
import ManagePurchasedMovies from "../../components/purchasedMovies/managePurchasedMovies";

import ManageGoogleBooks from "../../components/GoogleBooks/manageGoogleBooks";

import ManageBookRepository from "../../components/BookRepository/manageBookRepository";

//Redux
import { connect } from "react-redux";

const Dashboard = (props) => {
  const {
    UI: { dashboard },
  } = props;

  return (
    <>
      <AuthenticatedNavbar />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <DashboardNavbar />
          </Col>
          {dashboard === 3 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageBookReservation />
            </Col>
          ) : dashboard === 5 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageCompareBookPrices />
            </Col>
          ) : dashboard === 7 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManagePurchaseBooks />
            </Col>
          ) : dashboard === 8 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManagePurchasedMovies />
            </Col>
          ) : dashboard === 9 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageGoogleBooks />
            </Col>
          ) : dashboard === 10 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageBookRepository />
            </Col>
          ) : (
            <>
              <Col xs={7} id="page-content-wrapper">
                {dashboard === 0 ? (
                  <ManageUsers />
                ) : dashboard === 1 ? (
                  <ManageBooks />
                ) : (
                  <ManageMovies />
                )}
              </Col>
              <Col xs={3} id="page-content-wrapper">
                {dashboard === 0 ? (
                  <ViewUser />
                ) : dashboard === 1 ? (
                  <ViewBook />
                ) : (
                  <ViewMovie />
                )}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

Dashboard.propType = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Dashboard);
