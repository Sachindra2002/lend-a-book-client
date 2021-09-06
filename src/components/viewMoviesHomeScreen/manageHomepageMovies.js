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

//REDUX
import { connect } from "react-redux";
import { getUserPersonalizedMovies } from "../../redux/actions/userActions";

//Import Components
import MovieCard from "./homepageMovieCard";

//Import Consts
import { MOVIE_TYPES } from "../../utils/consts";

function ManageHomepageMovies(props) {
  const [_movies, setmovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);
  const [genre, setGenre] = useState("Movie Genre");

  const {
    data: { movies, loading },
  } = props;

  //When component is initiated, get all movies from the backend
  useEffect(() => {
    props.getUserPersonalizedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When movie list is passed from props are updated, update state variables
  useEffect(() => {
    if (movies) {
      setmovies(movies);
      setMoviePool(movies);
    }
  }, [movies]);

  //Function to create a list of movie cards from movie list in state
  let moviesMarkup = _movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  //Function to change displayes movies when genre is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on genre update state
    if (type === "genre") setGenre(name);

    //Filter Movie list
    const moviesCopy = movies.map((movie) => movie);
    const result = moviesCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render movie cards
    setmovies(result);
    setMoviePool(result);
  };

  //Function to search movies
  const search = (input) => {
    //Get a copy of state
    const movieCopy = moviePool.map((movie) => movie);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Movie title, director will be serached through
    const searchKeys = ["movieName", "director"];
    let moviesArray = [];

    //If search criteria is null reset movies to display all movies
    if (inputs.length === 1 && inputs[0] === "") {
      moviesArray = movieCopy;
    }

    //if search criteria is entered
    else {
      //Filter through movie liest to find matches
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
    setmovies(result);
  };

  const handleReset = () => {
    //Reset dropdown text
    setGenre("Genre");

    //Reset State
    setmovies(movies);
    setMoviePool(movies);
  };

  //Drop down for select genre of movie
  const genreDropdownmarkup = MOVIE_TYPES.map((type, index) => (
    <Dropdown.Item
      key={index}
      onSelect={() => setValue("movieGenre", type.name, type.id)}
    >
      {type.name}
    </Dropdown.Item>
  ));

  return (
    <div className="book-box">
      <Card className="search-box-books">
        <Card.Title className="book-box-title">Movies to Watch Now</Card.Title>
        <Row>
          <Col xs={5}>
            <InputGroup className="search-bar">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search for movies"
                aria-label="Search for movies"
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
          moviesMarkup.map((card, index) => (
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

ManageHomepageMovies.propTypes = {
  getUserPersonalizedMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getUserPersonalizedMovies,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ManageHomepageMovies);
