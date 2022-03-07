import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import superagent from "superagent";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";
import { getBookFromGoogleBooksApi } from "../../redux/actions/dataActions";

function ManageGoogleBooks(props) {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);

  const {
    data: { books, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getBookFromGoogleBooksApi();
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
    <Card className="book-card">
      <Card.Img variant="top" src={
          book &&
          book.volumeInfo &&
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.thumbnail
      } className="book-card-image" />
      <Card.Body>
        <Badge variant="secondary">Title</Badge>
        <span>
          {"   "}
          {book && book.volumeInfo && book.volumeInfo.title}
        </span>
        <br />
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`Published on ${dayjs(book && book.volumeInfo && book.volumeInfo.publishedDate)
          .format("DD/MM/YYYY", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</small>
      </Card.Footer>
    </Card>

  ));

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.getBookFromGoogleBooksApi(book);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Card className="search-box-users">
          <Card.Body>
            <Card.Title>Search Books</Card.Title>
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
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              <Col xs={1}>
                <Row>
                  <Col>
                    <Button type="submit">Search</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
      <Row>
        {loading ? (
          <p>Loading</p>
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

ManageGoogleBooks.propTypes = {
  getBookFromGoogleBooksApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getBookFromGoogleBooksApi,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageGoogleBooks);
