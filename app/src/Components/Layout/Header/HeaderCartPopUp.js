import React, { Component } from 'react'

export default class HeaderCartPopUp extends Component {
  render() {
    return (
      <div id='popup_cart' className='block-popup'>
        <div className='popup__wrapper'>
          <div className='popup__title--wrapper mb-40'>
            <span className='popup__title--static'>My Bag, </span>
            <span className='popup__title--amount'>{this.props.propsOverallQuantity} {this.props.propsOverallQuantity > 1 ? 'Items' : 'Item'}</span>
          </div>
          <div className='popup__content'>
            {this.props.propsCartProduct.map((mainVal, mainIndex) => (
              <div key={mainVal.selectedProduct.id + '_' + mainIndex} className='block-popup-cart'>
                <div className='popup-cart__wrapper'>
                  <div className='popup-cart__data'>
                    <div className='popup-cart__wrapper-text'>
                      <span className='popup-cart__wrapper-text--name'>{mainVal.selectedProduct.brand}</span>
                    </div>
                    <div className='popup-cart__wrapper-text'>
                      <span className='popup-cart__wrapper-text--name'>{mainVal.selectedProduct.name}</span>
                    </div>
                    <div className='popup-cart__wrapper-text'>
                      <span className='popup-cart__wrapper-text--price'>{this.props.propsCurrentCurrency}{' '}{mainVal.selectedProduct.prices[this.props.propsCurrentCurrencyIndex].amount}</span>
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
                              className={valAttributes.id === 'Color' ? (val.value == mainVal.selectedProductColor ? 'block-color active selected popup-color' : 'block-color selected popup-color') : (val.value == mainVal.selectedProductAttributes[indexAttributesList] ? 'block-attributes active selected popup-attributes' : 'block-attributes notactive selected popup-attributes')}
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

                  <div className='popup-cart__image-slider'>
                    <div className='popup-cart__image--amount'>
                      <button onClick={() => this.props.functionProductQuantityIncrease(mainIndex)} className='button-math increase'></button>
                      <span className="popup-cart__image--amount-text">{this.props.propsProductQuantity[mainIndex]}</span>
                      <button onClick={() => this.props.functionProductQuantityDecrease(mainIndex)} className='button-math decrease'></button>
                    </div>
                    <div className='popup-cart__image--container'>
                      <div id='popup_remove_button' onClick={() => this.props.functionProductRemove(mainIndex)} className='popup-cart__remove'></div>
                      <div className='popup-cart__image' style={{ backgroundImage: `url(${this.props.propsCartProduct[mainIndex].selectedProduct.gallery[0]})`, }}></div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          <div className='popup__text-price--wrapper'>
            <span className='popup__text-price'>Total:</span>
            <span className='popup__text-price'>{this.props.propsOverallprice}</span>
          </div>
          <div className='popup__button-wrapper'>
            <button onClick={(() => this.props.functionSetView('Cart'))} className='button button-outline'>VIEW BAG</button>
            <button onClick={(() => this.props.functionSetView('Home'))} className='button button-primary'>CHECK OUT</button>
          </div>
        </div>
      </div>
    )
  }
}
