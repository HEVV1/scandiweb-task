import React, { Component } from 'react';
import GetProducts from './GetProducts';

const productsId = [
  { id: 'huarache-x-stussy-le' },
  { id: 'jacket-canada-goosee' },
  { id: 'ps-5' },
  { id: 'xbox-series-s' },
  { id: 'apple-imac-2021' },
  { id: 'apple-iphone-12-pro' },
  { id: 'apple-airpods-pro' },
  { id: 'apple-airtag' },
];

class ProductsList extends Component {
  constructor(props) {
    super(props);    
    this.state = { productsObj: [{ productName: '' }] };
  } 

  render() {
    return (
      <main className='block-product-list mb-200'>
        <div className='wrapper-text-header mb-100'>
          <div className='container'>
            <h2 className='styled-as-h2'>Category name</h2>
          </div>
        </div>
        <div className='container'>
          <div className='product-list__wrapper'>
            {productsId.map((val, index) => (              
              <GetProducts                
                clickFunction={this.props.clickFunction}
                selectedCurrency={this.props.propsCurrentCurrency}
                propsCurrentCurrencyIndex={this.props.propsCurrentCurrencyIndex}
                key={val.id}
                productId={val.id}
                propsProductCategory={this.props.propsProductCategory}
                />
            ))}            
          </div>
        </div>
      </main>
    );
  }
}

export default ProductsList;
