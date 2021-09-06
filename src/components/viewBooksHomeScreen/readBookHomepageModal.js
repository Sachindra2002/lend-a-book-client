import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  Button,
  Table,
  Badge,
  Card,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";


//REDUX
import { connect } from "react-redux";

function ReadBookHomepageModal(props){
    //Destructure props
  const {
    UI: { loading },
    book,
  } = props;

  const [errors, setErrors] = useState({});

  
}