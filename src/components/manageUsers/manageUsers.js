import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  CardColumns,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import "./manageUsers.scss";

import UserCard from "./userCard";

//REDUX
import { connect } from "react-redux";
import { getAllUsers } from "../../redux/actions/dataActions";

function ManageUsers(props) {
  const [_users, setUsers] = useState([]);
  const [userPool, setUserPool] = useState([]);
  const [category, setCategory] = useState(0);

  const {
    data: { users, loading },
  } = props;

  useEffect(() => {
    props.getAllUsers();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users) {
      setUsers(users);
      setUserPool(users);
    }
  }, [users]);

  //Divide cards into arrays or given size
  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let userMarkup = _users.map((user) => (
    <UserCard key={user.email} user={user} />
  ));

  let chunkedUsersMarkup = chunk(userMarkup, 3);

  //Search users using firstname, lastname or email
  const search = (input) => {
    const userCopy = userPool.map((user) => user);
    const inputs = input.toLowerCase().split(" ");
    const searchKeys = ["email", "firstName", "lastName"];
    let userArray = [];
    if (inputs.length === 1 && inputs[0] === "") {
      userArray = userCopy;
    } else {
      inputs.forEach((word) => {
        userCopy.filter((item) => {
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) userArray.push(item);
            }
            return null;
          });
        });
      });
    }
    const result = [...new Set(userArray)];
    setUsers(result);
  };

  //When "View All Users" button is clicked
  const setAllUsers = () => {
    setCategory(0);
    const usersCopy = users.map((user) => user);
    setUserPool(usersCopy);
    setUsers(usersCopy);
  };

  //When "View Non-verified Users" button is clicked
  const setNonVerified = () => {
    setCategory(1);
    const usersCopy = users.map((user) => user);
    const result = usersCopy.filter((item) => {
      return !item.isVerified;
    });
    setUserPool(result);
    setUsers(result);
  };

  //When "View Banned Users" button is clicked
  const setBanned = () => {
    setCategory(2);
    const usersCopy = users.map((user) => user);
    const result = usersCopy.filter((item) => {
      return item.isBanned;
    });
    setUserPool(result);
    setUsers(result);
  };

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search Users</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                    {/* <InputGroup.Text>
                        <i className="fas fa-search"></i>
                    </InputGroup.Text> */}
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Search for a user"
                    aria-label="Search for a user"
                    aria-describedby="basic-addon2"
                    onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
                <Button
                    className="search-user-button"
                    variant="outline-primary"
                    active={category === 0}
                    onClick={setAllUsers}
                >
                    All Users
                </Button>{" "}
                <Button
                    className="search-user-button"
                    variant="outline-secondary"
                    active={category === 1}
                    onClick={setNonVerified}
                >
                    Non-verified
                </Button>{" "}
                <Button
                    className="search-user-button"
                    variant="outline-danger"
                    active={category === 2}
                    onClick={setBanned}
                >
                    Banned
                </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {_users.length > 0 ? (
          chunkedUsersMarkup.map((chunk, index) => (
              <CardColumns key={index}>{chunk}</CardColumns>
          ))
      ) : loading ? (
          <p>Loading...</p>
      ) : (
          <Alert variant="warning" className="alert">No users found</Alert>
      )}
    </div>
  );
}

ManageUsers.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapActionsToProps = {
    getAllUsers,
}

export default connect(mapStateToProps, mapActionsToProps)(ManageUsers);
