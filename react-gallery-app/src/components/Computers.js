import React from "react";
import PhotoContainer from "./PhotoContainer";

export default function Computer(props) {
  return <PhotoContainer pictures={props.pictures} />;
}
