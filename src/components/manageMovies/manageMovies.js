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
import MovieCard from "./movieCard";
import AddMovieModal from "./addMovieModal";

//REDUX
import { connect } from "react-redux";
import { getAllMovies } from "../../redux/actions/dataActions";

//SCSS
import "./manageMovies.scss";

//Import Consts
import { MOVIE_TYPES } from "../../utils/consts";

function ManageMovies(props) {
  const [_movies, setmovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [genre, setGenre] = useState("Movie Genre");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { movies, loading },
  } = props;

  //When component is initiated, get all movies from the backend
  useEffect(() => {
    props.getAllMovies();
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
    else if (type === "isAvailable") setAvailability(name);

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
    setAvailability("Availability");

    //Reset State
    setmovies(movies);
    setMoviePool(movies);
  };

  //Drop down for select genre of movie
  const genreDropdownmarkup = MOVIE_TYPES.map((type, index) => (
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
          <Card.Title>Search Movies</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search for movies"
                  aria-label="Search for movies"
                  aria-describedby="basic=addon2"
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
                <Row>
                  <Col xs={5}>
                    <Button
                      variant="outline-secondary"
                      className="search-user-button"
                      onClick={handleReset}
                    >
                      <span>
                        <i className="fas fa-times reset-icon"></i>
                      </span>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={4}>
          <Card className="book-card">
            <Card.Img
              variant="info"
              src="http://localhost:5000/movies/addMovie.jpg"
            />
            <Card.Body>
              <Button
                variant="info"
                className="book-card-button"
                onClick={() => setAddModalShow(true)}
              >
                <span>
                  <i className="fas fa-plus-square fa-plus-square-add"></i>
                  Add Movie
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
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
      <AddMovieModal show={addModalShow} onHide={() => setAddModalShow(false)} />
    </div>
  );
}

ManageMovies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllMovies,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageMovies);
