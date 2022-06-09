import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {productItem: this.props.productData}
  }

  render() {
    console.log(this.state);
    return (
      <div className="block-product in-stock">
        <div className="product__wrapper">
          <div className="product__image">           
            <div className="image" style={{ backgroundImage:`url(${this.state.productItem.gallery[0]})` }}></div>
          </div>
          <div className="product__text-wrapper text-name-wrapper">
            <span className="product__text">{this.state.productItem.name}</span>
          </div>
          <div className="product__text-wrapper text-price-wrapper">
            <span className="product__text">{this.state.productItem.prices[0].currency.symbol} {this.state.productItem.prices[0].amount}</span>
          </div>
        </div>  
      </div>
    );
  }
}

export default Product;