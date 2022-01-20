import React from "react";
import { Badge, Card, OverlayTrigger, Popover } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";
import { getMovie } from "../../redux/actions/dataActions";

import HomepageMovieModal from "./homepageMovieModal";

function HomepageMovieCard(props) {
  const [homepageMovieModalShow, setHomepageMovieModalShow] =
    React.useState(false);

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
    if (!props.isBanned) {
      setHomepageMovieModalShow(true);
    }
    if (props.isVerified && !props.isBanned) {
      props.getMovie(id);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{movieName}</Popover.Title>
      <Popover.Content>{movieSummary}</Popover.Content>
    </Popover>
  );

  return (
    <div>
      <OverlayTrigger trigger="#hover" placement="top" overlay={popover}>
        <Card className="homepage-card" onClick={() => handleSetMovie(id)}>
          <Card.Img variant="top" src={movieImage} className="image" />
        </Card>
      </OverlayTrigger>
      <HomepageMovieModal
        history={props.history}
        isVerified={props.isVerified}
        show={homepageMovieModalShow}
        onHide={() => setHomepageMovieModalShow(false)}
      />
    </div>
  );
}

HomepageMovieCard.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  isVerified: state.user.isVerified,
  isBanned: state.user.isBanned,
  authenticated: state.user.authenticated,
  role: state.user.userRole,
  getMovie: PropTypes.func.isRequired,
});

const mapActionsToProps = {
  getMovie,
};

export default connect(mapStateToProps, mapActionsToProps)(HomepageMovieCard);
