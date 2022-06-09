import React, { Component } from "react";
import Header from "./Components/Layout/Header/Header";
import ProductsList from "./Components/Products/ProductsList";

class App extends Component {
  render() {
    return (
      <div className="wrapper-page-header-and-content">
        <Header />
        <div className="wrapper-page-content">
          <div className="wrapper-text-header mb-100">
            <div className="container">
              <h2 className="styled-as-h2">Category name</h2>
            </div>
          </div>
          <ProductsList></ProductsList>
        </div>
      </div>
    );
  }
}

export default App;
