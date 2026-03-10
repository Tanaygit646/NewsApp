import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <Router>
        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<News apikey={this.apikey} key="general" pagesize={5} country="us" category="general" />}
          />

          <Route
            path="/entertainment"
            element={<News apikey={this.apikey} key="entertainment" pagesize={5} country="us" category="entertainment" />}
          />
          
          <Route
            path="/business"
            element={<News apikey={this.apikey} key="business" pagesize={5} country="us" category="business" />}
          />

          <Route
            path="/health"
            element={<News apikey={this.apikey} key="health" pagesize={5} country="us" category="health" />}
          />

          <Route
            path="/science"
            element={<News apikey={this.apikey} key="science" pagesize={5} country="us" category="science" />}
          />

          <Route
            path="/sports"
            element={<News apikey={this.apikey} key="sports" pagesize={5} country="us" category="sports" />}
          />

          <Route
            path="/technology"
            element={<News apikey={this.apikey} key="technology" pagesize={5} country="us" category="technology" />}
          />

        </Routes>
      </Router>
    );
  }
}