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
          {dashboard === 2 ? (
            <Col xs={10} id="page-content-wrapper">
            </Col>
          ) : dashboard === 3 ? (
            <Col xs={10} id="page-content-wrapper">
            </Col>
          ) : (
            <>
              <Col xs={7} id="page-content-wrapper">
                {dashboard === 0 ? <ManageUsers/> : <ManageBooks/>}
              </Col>
              <Col xs={3} id="page-content-wrapper">
                {dashboard === 0 ? <ViewUser/> : <ViewBook/>}
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
