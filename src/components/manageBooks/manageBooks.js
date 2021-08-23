import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

//Import Components
import BookCard from "./bookCard";
import AddBookModal from "./addBookModal";

//REDUX
import { connect } from "react-redux";
import { getAllBooks } from "../../redux/actions/dataActions";

//SCSS
import "./manageBooks.scss";

//Import consts
import { BOOK_TYPES } from "../../utils/consts";

function ManageBooks(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [genre, setGenre] = useState("Book Genre");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { books, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getAllBooks();
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
    <BookCard key={book.isbn} book={book} />
  ));

  //Function to change displayed books when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "genre") setGenre(name);
    else if (type === "isAvailable") setAvailability(name);

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

    //If sreach criteria is null reset books to display all books
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
    setAvailability("Availability");

    //Reset State
    setBooks(books);
    setBookPool(books);
  };

  //Drop down for select genre of book
  const genreDropdownmarkup = BOOK_TYPES.map((type, index) => (
    <Dropdown.Item
      key={index}
      onSelect={() => setValue("type", type.name, type.id)}
    >
      {type.name}
    </Dropdown.Item>
  ));

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search Books</Card.Title>
          <Row>
            <Col xs={5}>
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
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {genre}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{genreDropdownmarkup}</Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col style={{ padding: 0 }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      {available}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Available", true)
                        }
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
              </Row>
              <Row>
                <Col xs={5}>
                  <Button
                    variant="outline-secondary"
                    className="reset-button"
                    onClick={handleReset}
                  >
                    <span>
                      <i className="fas fa-times reset-icon"></i>
                    </span>
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={4}>
          <Card className="book-card">
            <Card.Img variant="info" src="http://localhost:5000/books/addBook.jpg" />
            <Card.Body>
              <Button
                variant="info"
                className="book-card-button"
                onClick={() => setAddModalShow(true)}
              >
                <span>
                  <i className="fas fa-plus-square fa-plus-square-add"></i>
                  Add Book
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
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
      <AddBookModal show={addModalShow} onHide={() => setAddModalShow(false)} />
    </div>
  );
}

ManageBooks.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllBooks,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageBooks);
