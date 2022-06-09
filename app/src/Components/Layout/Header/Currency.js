import React, { Component } from "react";

class Currency extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <li onClick={this.props.clickme}>
        <span>{this.props.symbol} {this.props.label}</span>
      </li>
    );
  }
}

export default Currency;
