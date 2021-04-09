import React, { Component } from "react";

export class PhotoContainer extends Component {
  state = {
    pictures: [
      {
        id: 1,
        url: "https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg",
        alt: "dog",
      },
      {
        id: 2,
        url: "https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg",
        alt: "dog",
      },
      {
        id: 3,
        url: "https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg",
        alt: "dog",
      },
      {
        id: 4,
        url: "https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg",
        alt: "dog",
      },
    ],
  };
  render() {
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {this.state.pictures.map((picture) => {
            return (
              <li key={picture.id}>
                <img src={picture.url} alt={picture.alt}></img>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;
