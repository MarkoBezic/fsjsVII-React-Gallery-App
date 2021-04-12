import React from "react";

export default function Photo({ picture }) {
  return (
    <div>
      <li>
        <img src={picture} alt="alt"></img>
      </li>
    </div>
  );
}
