import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/dataActions";

//Import Components
import CommentCard from "./commentCard";

function Comment(props) {
  const [content, setContent] = useState("");
  const [_comments, setComments] = useState([]);
  const [commentPool, setCommentPool] = useState([]);

  var counter = 0;

  const {
    data: { comments, loading, book },
  } = props;


  //When comment list is passed from props are updated, update state variables
  useEffect(() => {
    if (comments) {
      setComments(comments);
      setCommentPool(comments);
    }
  }, [comments]);

  //Function to create a list of comment cards from comment list in state
  let commentsMarkup = _comments.map(
    (comment) => (
      (counter = counter + 1),
      (<CommentCard key={comment.id} comment={comment} />)
    )
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      content: content,
      isbn: book.isbn,
    };

    //Add comment to the backend
    let result = await props.addComment(data);

    //If no errors are found
    if (result === true) {
      clearFields();
    }
  };

  const clearFields = () => {
    setContent("");
  };

  return (
    <div>
      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        Comments ( {counter} )
      </p>
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
            <Button type="submit" onClick={handleSubmit} variant="outline-primary">
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

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.data.comments,
  data: state.data,
});

const mapActionsTopProp = {
  addComment,
};

export default connect(mapStateToProps, mapActionsTopProp)(Comment);
