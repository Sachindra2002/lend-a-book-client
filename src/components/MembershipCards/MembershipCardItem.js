import React from "react";
import { Link } from "react-router-dom";
import "../MembershipCards/MembershipCard.css";

function MembershipCardItem(props) {
  const redirectRegister = () => {
    alert("You have clicked " + props.text);
  }
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link" to={props.path}>
          <div className="cards__item__info">
            <h2 className="cards__item__text" style={{ color: props.colour }}>
              {props.text}
            </h2>
            <div className="cards__items__features">
              <h3>{props.point1}</h3>
              <h3>{props.point2}</h3>
              <h3>{props.point3}</h3>
              <h3>{props.point4}</h3>
              <h3>{props.point5}</h3>
              <h3>{props.point6}</h3>
              <h3>{props.point7}</h3>
              <h3>{props.point8}</h3>
            </div>
            <div className="membership-type-button">
              <button
                onClick={redirectRegister}
                option={props.text}
                className="membership-type-button-design"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default MembershipCardItem;
