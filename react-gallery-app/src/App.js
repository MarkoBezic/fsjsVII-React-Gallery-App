import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import SearchForm from "./components/SearchForm";
import PhotoContainer from "./components/PhotoContainer";
import Nav from "./components/Nav";
import apiKey from "./config";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Dogs&per_page=24&format=json&nojsoncallback=1`
      )
      .then((responseData) => {
        this.setState({ pictures: responseData.data.photos });
      })
      .catch((error) => {
        console.log("Error fetching and parsin data", error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <SearchForm />
        <Nav />
        <Route
          path="/"
          render={() => <PhotoContainer pictures={this.state.pictures.photo} />}
        />
      </BrowserRouter>
    );
  }
}

export default App;
