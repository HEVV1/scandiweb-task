import React, { Component } from 'react';

class Product extends Component {
  render() {
    let inStock = '';
    let visibleItems = '';
    if (this.props.productData.inStock) {
      inStock = 'in-stock';
    }
    else {
      inStock = 'out-of-stock';
    }

    if (this.props.propsProductCategory == 'all') {
      visibleItems = 'show';
    }
    else{
      if (this.props.productData.category == this.props.propsProductCategory) {        
        visibleItems = 'show';
      }
      else{        
        visibleItems = 'hide';
      }
    }


    return (
      <div onClick={this.props.clickFunction} className={`block-product ${inStock} ${visibleItems}`}>
        <div className='product__wrapper'>
          <div className='product__image'>
            <div
              className='image'
              style={{
                backgroundImage: `url(${this.props.productData.gallery[0]})`,
              }}
            ></div>
          </div>
          <div className='product__text-wrapper text-name-wrapper'>
            <span className='product__text'>{this.props.productData.name}</span>
          </div>
          <div className='product__text-wrapper text-price-wrapper'>
            <span className='product__text'>
              {this.props.selectedCurrency}{' '}
              {
                this.props.productData.prices[
                  this.props.propsCurrentCurrencyIndex
                ].amount
              }
            </span>
          </div>
        </div>
      </div>
    );

  }
}

export default Product;
