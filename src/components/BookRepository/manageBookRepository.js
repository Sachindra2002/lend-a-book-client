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

import BookRepoCard from "./bookRepoCard";

//REDUX
import { connect } from "react-redux";
import { getAllMongoBooks } from "../../redux/actions/dataActions";

//Import consts
import { BOOK_TYPES } from "../../utils/consts";

function ManageBookRepository(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [genre, setGenre] = useState("Book Genre");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { mongo_books, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getAllMongoBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When book list is passed from props are updated, update state variables
  useEffect(() => {
    if (mongo_books) {
      setBooks(mongo_books);
      setBookPool(mongo_books);
    }
  }, [mongo_books]);

  //Function to create a list of book cards from book list in state
  let booksMarkup = _books.map((book) => (
    <BookRepoCard key={book._id} book={book} />
  ));

  //Function to change displayed books when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "bookGenre") setGenre(name);
    else if (type === "isAvailable") setAvailability(name);

    //Filter Book List
    const booksCopy = mongo_books.map((book) => book);
    const result = booksCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render book cards
    setBooks(result);
    setBookPool(result);
  };

  const handleReset = () => {
    //Reset dropdown text
    setGenre("Genre");
    setAvailability("Availability");

    //Reset State
    setBooks(mongo_books);
    setBookPool(mongo_books);
  };

  //Drop down for select genre of book
  const genreDropdownmarkup = BOOK_TYPES.map((type, index) => (
    <Dropdown.Item
      key={index}
      onSelect={() => setValue("bookGenre", type.name, type.id)}
    >
      {type.name}
    </Dropdown.Item>
  ));

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search for Books</Card.Title>
          <Row>
            <Col xs={3}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search for books"
                  aria-label="Search for books"
                  aria-describedby="basic-addon2"
                  //   onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={2}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-info"
                  id="dropdown-basic"
                  style={{ width: "100%" }}
                >
                  {genre}
                </Dropdown.Toggle>
                <Dropdown.Menu>{genreDropdownmarkup}</Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={2}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {available}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onSelect={() => setValue("isAvailable", "Available", true)}
                  >
                    Available
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={() =>
                      setValue("isAvailable", "Unavailable", false)
                    }
                  >
                    Unavailable
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-danger"
                onClick={handleReset}
              >
                <span>
                  <i className="fas fa-times reset-icon"></i>
                </span>
                Reset
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          booksMarkup.map((card, index) => (
            <Col lg={4} md={4} sm={4} key={index}>
              {" "}
              {card}{" "}
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

ManageBookRepository.propTypes = {
  getAllMongoBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllMongoBooks,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ManageBookRepository);
