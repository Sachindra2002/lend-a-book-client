import React from 'react'
import {Link} from 'react-router-dom';
import '../MembershipCards/MembershipCard.css';

function MembershipCardItem(props) {
    return (
        <>
            <li className="cards__item">
                <Link className="cards__item__link" to={props.path}>
                    {/* <figure className="cards__item__pic-wrap" data-category={props.label}>
                        <img src="/" alt="Membership Type Image" className="cards__item__img"/>
                    </figure> */}
                    <div className="cards__item__info">
                        <h2 className="cards__item__text" style={{color: props.colour }} >
                            {props.text} 
                        </h2>
                        <div className="cards__items__features">
                            <h3>
                                {props.point1}
                            </h3>
                            <h3>
                                {props.point2}
                            </h3>
                            <h3>
                                {props.point3}
                            </h3>
                            <h3>
                                {props.point4}
                            </h3>
                            <h3>
                                {props.point5}
                            </h3>
                            <h3>
                                {props.point6}
                            </h3>
                            <h3>
                                {props.point7}
                            </h3>
                            <h3>
                                {props.point8}
                            </h3>
                        </div>
                    </div> 
                </Link>
            </li>
        </>
    )
}

export default MembershipCardItem
