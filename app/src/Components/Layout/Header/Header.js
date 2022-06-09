import React, { Component, useState } from "react";
import { GetCurrency } from "./GetCurrency";
import CurrentCurrency from "./CurrentCurrency";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedCurrency = this.handleSelectedCurrency.bind(this);
    this.state = { currency: "$" };
  }

  handleSelectedCurrency = (props) => {
    this.setState({ currency: props });
  };

  render() {
    const currentCurrency = this.state.currency;
    return (
      <header className="layout-header">
        <div className="container">
          <div className="header__wrapper">
            <nav className="header__links">
              <ul>
                <li className="header__link-list">
                  <a className="header__link" href="#">
                    Women
                  </a>
                </li>
                <li className="header__link-list">
                  <a className="header__link" href="#">
                    Men
                  </a>
                </li>
                <li className="header__link-list">
                  <a className="header__link" href="#">
                    Kids
                  </a>
                </li>
              </ul>
            </nav>
            <div className="header__wrapper-image">
              <a href="#">
                <img
                  className="image"
                  src={require("../../../assets/images/logo_store.svg")}
                  alt="Store Logo"
                />
              </a>
            </div>
            <div className="header__options">
              <div className="header__options-currency">
                <div className="header__options-currency-wrapper">
                  <CurrentCurrency currencySign={currentCurrency} />
                  <img className="image" src={require("../../../assets/images/icons/ic_chevron.svg")} />
                </div>
                <div className="header__options-currency-content">
                  <GetCurrency
                    functionSelectCurrency={this.handleSelectedCurrency}
                  />
                </div>
              </div>
              <div className="header__options-cart">
                <a href="#">
                  <img className="image" src={require("../../../assets/images/icons/ic_cart.svg")} alt="cart" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
