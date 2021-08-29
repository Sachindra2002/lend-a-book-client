import React from "react";
import { Badge, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./movieCard.scss";

//REDUX
import { connect } from "react-redux";
import { getMovie } from "../../redux/actions/dataActions";

function MovieCard(props) {
  const {
    movieName,
    director,
    imdbScore,
    movieSummary,
    is18,
    isAvailableOnline,
    isAvailable,
    movieGenre,
    movieImage,
    id,
    createdAt,
  } = props.movie;

  const handleSetMovie = (id) => {
    props.getMovie(id);
  };

  return (
    <Card className="book-card" onClick={() => handleSetMovie(id)}>
      <Card.Img variant="top" src={movieImage} className="book-card-image" />
      <Badge
        pill
        className="book-card-badge"
        variant={isAvailable ? "success" : "Unavailable"}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
      <Card.Body>
        <span>
          {"    "}
          {movieName}
        </span>
        <br />
        <Badge variant="secondary">Movie ID</Badge>
        <span>
          {"    "}
          {id}
        </span>
        <br />
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`Uploaded on ${dayjs(createdAt)
          .format("DD/MM/YYYY h:mm:ss A [GMT]", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</small>
      </Card.Footer>
    </Card>
  );
}

MovieCard.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getMovie,
};

export default connect(null, mapActionsToProps)(MovieCard);
