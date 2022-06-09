import React, { Component } from "react";

class CurrentCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = { someState: false };
  }
  
  render() {
    return <span className="header__options-current">{this.props.currencySign}</span>;
  }
}

export default CurrentCurrency;
