import React, { Component } from 'react';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCount: this.props.propsCartArrayZeroIndex,
    }
  }

  handleSlideImageRight(props) {

    let slideCountArrayIncrease = [...this.state.slideCount];

    if (this.state.slideCount[props] < this.props.propsCartProduct[props].selectedProduct.gallery.length - 1) {
      slideCountArrayIncrease[props] += 1;
      this.setState({ slideCount: slideCountArrayIncrease }, () => {
        console.log(this.state.slideCount);
      });
    }
    else {
      slideCountArrayIncrease[props] = 0;
      this.setState({ slideCount: slideCountArrayIncrease }, () => {
        console.log(this.state.slideCount);
      });
    }
  }

  handleSlideImageLeft = (props) => {
    let slideCountArrayDecrease = [...this.state.slideCount];

    if (this.state.slideCount[props] > 0) {
      slideCountArrayDecrease[props] -= 1;
      this.setState({ slideCount: slideCountArrayDecrease }, () => {
        console.log(this.state.slideCount);
      });
    }
    else {
      slideCountArrayDecrease[props] = this.props.propsCartProduct[props].selectedProduct.gallery.length - 1;
      this.setState({ slideCount: slideCountArrayDecrease }, () => {
        console.log(this.state.slideCount);
      });
    }
  }

  render() {
    return (
      <div className='block-cart mb-50'>
        <div className='container'>
          <div className='cart__wrapper'>
            <div className='page-wrapper-text mb-50'>
              <h3>Cart</h3>
            </div>
            {this.props.propsCartProduct.map((mainVal, mainIndex) => (
              <div key={mainVal.selectedProduct.id + '_' + mainIndex} className='block-cart-product'>
                <div className='cart-product__wrapper'>
                  <div className='cart-product__data'>
                    <div className='cart-product__wrapper-text'>
                      <h4>{mainVal.selectedProduct.brand}</h4>
                    </div>
                    <div className='cart-product__wrapper-text'>
                      <span className='styled-as-p3'>{mainVal.selectedProduct.name}</span>
                    </div>
                    <div className='cart-product__wrapper-text'>
                      <span className='styled-as-p2'>{this.props.propsCurrentCurrency}{' '}{mainVal.selectedProduct.prices[this.props.propsCurrentCurrencyIndex].amount}</span>
                    </div>
                    {mainVal.selectedProduct.attributes.map((valAttributes, indexAttributesList) => (
                      <div key={valAttributes.id} className={valAttributes.id == 'Color' ? 'block-color-list selected' : 'block-attributes-list selected'}>
                        <div className='wrapper-title mb-8'>
                          <span className='styled-as-p1'>{valAttributes.name}</span>
                        </div>
                        <div className={valAttributes.id == 'Color' ? 'color__list-wrapper' : 'attributes__list-wrapper'}>
                          {valAttributes.items.map((val, index) => (
                            <div key={val.id}
                              id={valAttributes.id == 'Color' ? 'color__' + val.value + '' : val.value}
                              className={valAttributes.id === 'Color' ? (val.value == mainVal.selectedProductColor ? 'block-color active selected' : 'block-color selected') : (val.value == mainVal.selectedProductAttributes[indexAttributesList] ? 'block-attributes active selected' : 'block-attributes notactive selected')}
                              style={valAttributes.id == 'Color' ? { backgroundColor: val.value } : { backgroundColor: '' }}>
                              <span className={valAttributes.id == 'Color' ? 'color__inner-element' : 'attributes__inner-element'}>
                                {valAttributes.id == 'Color' ? '' : val.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>)
                    )}
                  </div>
                  <div className='cart-product__image-slider'>
                    <div className='cart-product__image--amount'>
                      <button onClick={() => this.props.functionProductQuantityIncrease(mainIndex)} className='button-math increase'></button>
                      <span className="styled-as-p4">{this.props.propsProductQuantity[mainIndex]}</span>
                      <button onClick={() => this.props.functionProductQuantityDecrease(mainIndex)} className='button-math decrease'></button>
                    </div>
                    <div className='cart-product__image--container'>
                      <div onClick={() => this.props.functionProductRemove(mainIndex)} className='cart-product__remove'></div>
                      <div className='cart-product__image' style={{ backgroundImage: `url(${this.props.propsCartProduct[mainIndex].selectedProduct.gallery[this.state.slideCount[mainIndex]]})`, }}></div>
                      <div className='cart-product__image-arrows'>
                        <button onClick={() => this.handleSlideImageLeft(mainIndex)} className='cart-product__image-arrows-button arrows-left'></button>
                        <button onClick={() => this.handleSlideImageRight(mainIndex)} className='cart-product__image-arrows-button arrows-right'></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className='cart__wrapper--text-price mt-30 mb-20'>
              <span className='styled-as-p4'>Tax 21%:</span>
              <span className='styled-as-p2'> {this.props.propsTaxes}</span>
            </div>
            <div className='cart__wrapper--text-price mb-20'>
              <span className='styled-as-p4'>Quantity:</span>
              <span className='styled-as-p2'> {this.props.propsOverallQuantity}</span>
            </div>
            <div className='cart__wrapper--text-price mb-20'>
              <span className='styled-as-p4'>Total:</span>
              <span className='styled-as-p2'> {this.props.propsCurrentCurrency}{' '}{this.props.propsOverallprice}</span>
            </div>
            <div className='cart__wrapper--button-order'>
              <button className='button button-primary'>ORDER</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}