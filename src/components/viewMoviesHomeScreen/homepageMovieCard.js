import React from "react";
import { Badge, Card, OverlayTrigger, Popover } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS

//REDUX
import { connect } from "react-redux";
import { getMovie } from "../../redux/actions/dataActions";

function HomepageMovieCard(props) {
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
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{movieName}</Popover.Title>
      <Popover.Content>{movieSummary}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="#hover" placement="top" overlay={popover}>
      <Card className="homepage-card" onClick={() => handleSetMovie(id)}>
        <Card.Img variant="top" src={movieImage} className="image" />
      </Card>
    </OverlayTrigger>
  );
}

HomepageMovieCard.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getMovie,
};

export default connect(null, mapActionsToProps)(HomepageMovieCard);
