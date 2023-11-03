import React from "react";
import IconicImage from "../assets/images/iconic_restaurant.svg";

function IconicRestaurant(props) {
  const { width } = props;
  return <img src={IconicImage} width={width} alt="" />;
}

export default IconicRestaurant;
