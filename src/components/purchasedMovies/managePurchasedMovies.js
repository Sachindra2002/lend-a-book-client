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

//REDUX
import { connect } from "react-redux";
import { getAllCSVMovies } from "../../redux/actions/dataActions";

import CsvMovieCard from "./csvMovieCard";

function ManagePurchaseBooks(props) {
  const [_movies, setMovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);

  const {
    data: { movies, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getAllCSVMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When book list is passed from props are updated, update state variables
  useEffect(() => {
    if (movies) {
      setMovies(movies);
      setMoviePool(movies);
    }
  }, [movies]);

  //Function to create a list of book cards from book list in state
  let moviesMarkup = _movies.map((movie) => (
    <CsvMovieCard key={movie.id} movie={movie} />
  ));

  //Function to search books
  const search = (input) => {
    //Get a copy of state
    const movieCopy = moviePool.map((movie) => movie);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Book title, author, book name and isbn will be searched through
    const searchKeys = ["movieName", "director"];
    let moviesArray = [];

    //If search criteria is null reset books to display all books
    if (inputs.length === 1 && inputs[0] === "") {
      moviesArray = movieCopy;
    }
    //If serach criteria is entered
    else {
      //Filter through book list to find matches
      inputs.forEach((word) => {
        movieCopy.filter((item) => {
          // eslint-disable-next-line array-callback-return
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) moviesArray.push(item);
            }
          });
        });
      });
    }

    //Remove duplicates and set state to be displayed
    const result = [...new Set(moviesArray)];
    setMovies(result);
  };

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search for Movies</Card.Title>
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
          </Row>
        </Card.Body>
      </Card>
      <Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          moviesMarkup.map((card, index) => (
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

ManagePurchaseBooks.propTypes = {
  getAllCSVMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllCSVMovies,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ManagePurchaseBooks);
