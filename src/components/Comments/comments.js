import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

function Comment(props) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      content: content,
      bookISBN: props.isbn,
    };

    // axios.post("comment-addcommentbook", data)
    //     .then(response.data.success){
    //         console.log(object)
    //     }else {
    //         alert(" Failed to add comment");
    //     };

    //props.submitComment(data, props.history);
  };
  return (
    <div>
      <br />
      <p style={{ marginLeft: "5px" }}>replies</p>
      <hr />
      {/* Comment lists */}

      {/* Root Comment Form */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              as="textarea"
              placeholder="Write a comment"
              onChange={(e) => setContent(e.target.value)}
              //   style={{ width: "100", borderRadius: "5px" }}
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
    </div>
  );
}

export default Comment;
