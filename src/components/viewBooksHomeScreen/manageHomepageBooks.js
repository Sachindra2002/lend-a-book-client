import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Carousel,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { getUserPersonalizedBooks } from "../../redux/actions/userActions";

//Import Components
import BookCard from "./homepageBookCard";

//Import consts
import { BOOK_TYPES } from "../../utils/consts";

import "./manageHomepageBooks.scss";

function ManageHomepageBooks(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [genre, setGenre] = useState("Book Genre");


  const {
    data: { books, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getUserPersonalizedBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When book list is passed from props are updated, update state variables
  useEffect(() => {
    if (books) {
      setBooks(books);
      setBookPool(books);
    }
  }, [books]);

  //Function to create a list of book cards from book list in state
  let booksMarkup = _books.map((book) => (
    <div style={{ display: "flex" }}>
      <BookCard key={book.isbn} book={book} />
    </div>
  ));

  //Function to change displayed books when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "genre") setGenre(name);

    //Filter Book List
    const booksCopy = books.map((book) => book);
    const result = booksCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render book cards
    setBooks(result);
    setBookPool(result);
  };

  //Function to search books
  const search = (input) => {
    //Get a copy of state
    const bookCopy = bookPool.map((book) => book);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Book title, author, book name and isbn will be searched through
    const searchKeys = ["bookTitle", "authorName", "bookName", "isbn"];
    let booksArray = [];

    //If search criteria is null reset books to display all books
    if (inputs.length === 1 && inputs[0] === "") {
      booksArray = bookCopy;
    }
    //If serach criteria is entered
    else {
      //Filter through book list to find matches
      inputs.forEach((word) => {
        bookCopy.filter((item) => {
          // eslint-disable-next-line array-callback-return
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) booksArray.push(item);
            }
          });
        });
      });
    }

    //Remove duplicates and set state to be displayed
    const result = [...new Set(booksArray)];
    setBooks(result);
  };

  const handleReset = () => {
    //Reset dropdown text
    setGenre("Genre");

    //Reset State
    setBooks(books);
    setBookPool(books);
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
    <div className="book-box">
      <Card className="search-box-books">
        <Card.Title className="book-box-title">Books to Read Now</Card.Title>
        <Row>
          <Col xs={5}>
            <InputGroup className="search-bar">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search for books"
                aria-label="Search for books"
                aria-describedby="basic-addon2"
                onChange={(e) => search(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={7}>
            <Row>
              <Dropdown className="homepage-dropdown">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  style={{ width: "100%" }}
                >
                  {genre}
                </Dropdown.Toggle>
                <Dropdown.Menu>{genreDropdownmarkup}</Dropdown.Menu>
              </Dropdown>
              <Dropdown className="homepage-dropdown">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  style={{ width: "100%" }}
                >
                  Rating
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>1 Star</Dropdown.Item>
                  <Dropdown.Item>2 Star</Dropdown.Item>
                  <Dropdown.Item>3 Star</Dropdown.Item>
                  <Dropdown.Item>4 Star</Dropdown.Item>
                  <Dropdown.Item>5 Star</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="outline-danger"
                className="homepage-dropdown"
                onClick={handleReset}
              >
                <span>
                  <i className="fas fa-times reset-icon"></i>
                </span>
                Reset
              </Button>{" "}
            </Row>
          </Col>
        </Row>
      </Card>
      <div className="homepage-row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          booksMarkup.map((card, index) => (
            <Col lg={2} md={2} sm={2} key={index}>
              {" "}
              {card}{" "}
            </Col>
          ))
        )}
      </div>
    </div>
  );
}

ManageHomepageBooks.propTypes = {
  getUserPersonalizedBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  isVerified: state.user.isVerified,
  isBanned: state.user.isBanned,
  authenticated: state.user.authenticated,
  role: state.user.userRole,
  books: state.data.books,
});

const mapActionsTopProp = {
  getUserPersonalizedBooks,
};

export default connect(mapStateToProps, mapActionsTopProp)(ManageHomepageBooks);
