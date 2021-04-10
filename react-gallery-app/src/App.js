import React from "react";
import "./App.css";
import "./css/index.css";
import SearchForm from "./components/SearchForm";
import PhotoContainer from "./components/PhotoContainer";
import Nav from "./components/Nav";
import apiKey from "./config";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SearchForm />
      <Route path="/" component={Nav} />
      <PhotoContainer />
    </BrowserRouter>
  );
}

export default App;
