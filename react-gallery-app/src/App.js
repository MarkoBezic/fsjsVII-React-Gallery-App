import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import SearchForm from "./components/SearchForm";
import PhotoContainer from "./components/PhotoContainer";
import Nav from "./components/Nav";
import apiKey from "./config";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import NotFound from "./components/NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      catPics: [],
      dogPics: [],
      computerPics: [],
      queryTitle: "Results",
    };
  }

  componentDidMount() {
    this.performSearch();
    //load default pics
    this.performSearch();
    //load pics for navigation pages
    this.performSearch("cats");
    this.performSearch("dogs");
    this.performSearch("computers");
  }

  //fetch data, perform search and update state with queried data
  performSearch = (query = "Photos") => {
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
          : this.setState({
              pictures: responseData.data.photos.photo,
              queryTitle: query,
            });
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
            render={() => {
              this.performSearch();
              return this.state.pictures.length < 1 ? (
                <h3>Loading...</h3>
              ) : (
                <PhotoContainer
                  pictures={this.state.pictures}
                  title={this.state.queryTitle}
                />
              );
            }}
          />

          <Route
            path="/cats"
            render={() => (
              <PhotoContainer pictures={this.state.catPics} title={"Cats"} />
            )}
          />
          <Route
            path="/dogs"
            render={() => {
              return (
                <PhotoContainer pictures={this.state.dogPics} title={"Dogs"} />
              );
            }}
          />
          <Route
            path="/computers"
            render={() => {
              return (
                <PhotoContainer
                  pictures={this.state.computerPics}
                  title={"Computers"}
                />
              );
            }}
          />

          <Route
            exact
            path="/search/:searchText"
            render={(props) => {
              this.performSearch(props.match.params.searchText);
              return this.state.queryTitle !== props.match.params.searchText ? (
                <h4>Loading...</h4>
              ) : this.state.pictures.length < 1 ? (
                <h4>{`Sorry! No matches found for ${props.match.params.searchText}`}</h4>
              ) : (
                <PhotoContainer
                  pictures={this.state.pictures}
                  title={this.state.queryTitle}
                />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
