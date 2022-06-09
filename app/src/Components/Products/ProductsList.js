import React, { Component } from "react";
import GetProducts from "./GetProducts";

const productsId = [
  { id: "huarache-x-stussy-le" },
  { id: "jacket-canada-goosee" },
  { id: "ps-5" },
  { id: "xbox-series-s" },
  { id: "apple-imac-2021" },
  { id: "apple-iphone-12-pro" },
  { id: "apple-airpods-pro" },
  { id: "apple-airtag" },
];

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.handleProducts = this.handleProducts.bind(this);
    this.state = { productsObj: [{ productName: "" }] };
  }

  handleProducts = (props) => {};

  render() {
    return (
      <main className="block-product-list mb-200">        
        <div className="container">
          <div className="product-list__wrapper">
            {productsId.map((val, index) => (
              <GetProducts key={val.id} productId={val.id} />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default ProductsList;
