import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import SearchForm from "./components/SearchForm";
import PhotoContainer from "./components/PhotoContainer";
import Nav from "./components/Nav";
import apiKey from "./config";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cats from "./components/Cats";
import Dogs from "./components/Dogs";
import Computers from "./components/Computers";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      catPics: [],
      dogPics: [],
      computerPics: [],
    };
  }
  componentDidMount() {
    this.performSearch();
    this.performSearch("cats");
    this.performSearch("dogs");
    this.performSearch("computers");
  }

  performSearch = (query = "buildings") => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((responseData) => {
        query === "cats"
          ? this.setState({ catPics: responseData.data.photos.photo })
          : query === "dogs"
          ? this.setState({ dogPics: responseData.data.photos.photo })
          : query === "computers"
          ? this.setState({ computerPics: responseData.data.photos.photo })
          : this.setState({ pictures: responseData.data.photos.photo });
      })
      .catch((error) => {
        console.log("Error fetching and parsin data", error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PhotoContainer pictures={this.state.pictures} />}
          />
          <Route
            path="/cats"
            render={() => <Cats pictures={this.state.catPics} />}
          />
          <Route
            path="/dogs"
            render={() => <Dogs pictures={this.state.dogPics} />}
          />
          <Route
            path="/computers"
            render={() => <Computers pictures={this.state.computerPics} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
