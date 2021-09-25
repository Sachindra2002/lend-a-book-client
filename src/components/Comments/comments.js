import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";

//Import Components
import CommentCard from "./commentCard";

function Comment(props) {
  const [content, setContent] = useState("");
  const [_comments, setComments] = useState([]);
  const [commentPool, setCommentPool] = useState([]);

  const {
    data: { comments, loading },
  } = props;

  //When comment list is passed from props are updated, update state variables
  useEffect(() => {
    if (comments) {
      setComments(comments);
      setCommentPool(comments);
    }
  }, [comments]);

  //Function to create a list of comment cards from comment list in state
  let commentsMarkup = _comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              as="textarea"
              placeholder="Write a comment"
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          commentsMarkup.map((card, index) => (
            <Row>
              <Col key={index}>{card}</Col>
            </Row>
          ))
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {};

const mapStateToProps = (state) => ({
  comments: state.data.comments,
  data: state.data,
});

const mapActionsTopProp = {};

export default connect(mapStateToProps, mapActionsTopProp)(Comment);
