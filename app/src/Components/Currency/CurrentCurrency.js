import React, { Component } from "react";

class CurrentCurrency extends Component {
  render() {
    return (
      <span className="header__options-current">
        {this.props.propsCurrentCurrency}
      </span>
    );
  }
}

export default CurrentCurrency;
