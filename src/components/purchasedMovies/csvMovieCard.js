import React, { useState } from "react";
import { Badge, Button, Card, Col, Row, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
// import { addBookFromCSV } from "../../redux/actions/dataActions";
import { connect } from "react-redux";

function CSVMovieCard(props) {
  const [movieModalShow, setMovieModalShow] = useState(false);

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
    movieYear,
    id,
    createdAt,
  } = props.movie;

  //   const handleAddBook = async (event) => {
  //     const book = {
  //       isbn,
  //       bookName,
  //       bookSummary,
  //       bookGenre,
  //       authorName,
  //       bookYear,
  //       Publisher,
  //       isAvailable,
  //       bookFile,
  //       bookImage,
  //       is18,
  //     };

  //     let results = await props.addBookFromCSV(book);
  //   };

  return (
    <div>
      <Card className="book-card" style={{ height: 400 }}>
        <Card.Img variant="top" src={movieImage} className="book-card-image" />
        <Card.Body>
          <span>
            {"   "}
            {movieName}
          </span>
          <br />
          {/* <Badge variant="secondary"></Badge>
          <span>
            {"   "}
            {id}
          </span> */}
          <br />
          <Row>
            <Col>
              <Button
                // onClick={handleAddBook}
                variant="outline-success"
                style={{ marginTop: 10 }}
              >
                Add Movie
              </Button>
            </Col>
            <Col>
              <Button
                // onClick={() => setBookModalShow(true)}
                variant="outline-info"
                style={{ marginTop: 10 }}
              >
                View Movie
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Released on ${dayjs(movieYear)
            .format("DD/MM/YYYY", {
              timeZone: "Asia/Colombo",
            })
            .toString()}`}</small>
        </Card.Footer>
      </Card>
      <Modal
        show={movieModalShow}
        onHide={() => setMovieModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {movieName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Row>
                <Col>
                  <img
                    className="book-image"
                    src={movieImage}
                    alt="book"
                    style={{ width: 250 }}
                  ></img>
                </Col>
                <Col style={{ fontSize: 30, marginLeft: -90 }}>
                  <div>{movieName}</div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    {movieSummary}
                  </div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    Director : {director}
                  </div>
                  <br />
                  <div style={{ fontSize: 17, marginTop: -30 }}>
                    IMDB : {imdbScore}
                  </div>
                  <br />
                  <Row>
                    <Col>
                      <div>
                        <Button
                          variant="secondary"
                        >
                          Watch Online
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CSVMovieCard.propTypes = {
  //   addBookFromCSV: PropTypes.func.isRequired,
  UI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  //   addBookFromCSV,
};

export default connect(mapStateToProps, mapActionsToProps)(CSVMovieCard);
