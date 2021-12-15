import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./AuthenticatedNavbar.css";

//REDUX
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

function AuthenticatedNavbar(props) {
  const {
    authenticated,
    user: { userRole, isVerified },
  } = props;

  const handleLogout = () => {
    props.logoutUser();
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/homepage" className="navbar-logo">
            {/* <img width="150px" src={logo} alt="Logo"/> */}
            𝐿𝑒𝓃𝒹 𝒶 𝐵𝑜𝑜𝓀
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li>
              {isVerified && (
                <Link className="myreservation-button" to="/cart">
                  My Reservations
                </Link>
              )}
            </li>
            <li>
              <Link className="myreservation-button" onClick="">
                My Profile
              </Link>
            </li>
            <li>
              {userRole === "admin" && (
                <Button className="logout-button" href="/dashboard">
                  Dashboard
                </Button>
              )}
            </li>
            <li>
              <Button className="logout-button" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

AuthenticatedNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(AuthenticatedNavbar);
