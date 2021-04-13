import React from "react";
import PhotoContainer from "./PhotoContainer";

export default function Cats(props) {
  return <PhotoContainer pictures={props.pictures} title={props.title} />;
}
