import React, { Component, useState } from 'react';
import { GetCurrency } from '../../Currency/GetCurrency';
import CurrentCurrency from '../../Currency/CurrentCurrency';
import HeaderCartPopUp from './HeaderCartPopUp';
import { GetCategories } from './GetCategories';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartPopUpOpen: false
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleHeaderCartPopup);    
  }

  handleContentInPopUp = () => {
    switch (this.props.propsOverallQuantity) {
      case 0:
        return <div id='popup_cart' className='block-popup d-flex justify-content-center align-items-center'>
          <div className='popup__wrapper'>
            <div className='popup__title--wrapper text-center'>
              <span className='styled-as-p1'>Cart is empty</span>
            </div>
          </div>
        </div>
      default:
        return <HeaderCartPopUp
          functionSetView={this.props.functionSetView}
          propsCurrentCurrency={this.props.propsCurrentCurrency}
          propsfunctionSelectCurrency={this.props.propsfunctionSelectCurrency}
          propsOverallQuantity={this.props.propsOverallQuantity}
          propsCurrentCurrencyIndex={this.props.propsCurrentCurrencyIndex}
          propsCartArrayZeroIndex={this.props.propsCartArrayZeroIndex}
          propsCartProduct={this.props.propsCartProduct}
          propsProductQuantity={this.props.propsProductQuantity}
          propsTaxes={this.props.propsTaxes}
          propsOverallprice={this.props.propsOverallprice}
          functionProductQuantityIncrease={this.props.functionProductQuantityIncrease}
          functionProductQuantityDecrease={this.props.functionProductQuantityDecrease}
          functionProductRemove={this.props.functionProductRemove}>
        </HeaderCartPopUp>
    }
  }

  handleHeaderCartPopup = (e) => {
    const cartPopUpDOM = document.getElementsByClassName('block-popup');
    const cartButton = document.getElementById('header_cart_button');
    
    if (cartButton.contains(e.target)) {
      if (this.state.isCartPopUpOpen === false) {
        for (let obj of cartPopUpDOM) {
          obj.classList.add('active');
        }
        this.setState({ isCartPopUpOpen: true });
      } else {
        for (let obj of cartPopUpDOM) {
          obj.classList.remove('active');
        }
        this.setState({ isCartPopUpOpen: false });
      }
    }
    if (e.target.closest('.header__options-cart') == null) {
      for (let obj of cartPopUpDOM) {
        obj.classList.remove('active');
      }
      this.setState({ isCartPopUpOpen: false });
    }    
  }

  render() {
    return (
      <header className='layout-header'>
        <div className='container'>
          <div className='header__wrapper'>
            <nav className='header__links'>
              <GetCategories functionProductCategory={this.props.functionProductCategory}></GetCategories>              
            </nav>
            <div className='header__wrapper-image'>
              <a onClick={(() => this.props.functionSetView('Home'))}>
                <img
                  className='image'
                  src={require('../../../../public/assets/images/logo_store.svg')}
                  alt='Store Logo'
                />
              </a>
            </div>
            <div className='header__options'>
              <div className='header__options-currency'>
                <div className='header__options-currency-wrapper'>
                  <CurrentCurrency
                    propsCurrentCurrency={this.props.propsCurrentCurrency}
                  />
                  <img
                    className='image'
                    src={require('../../../../public/assets/images/icons/ic_chevron.svg')}
                  />
                </div>
                <div className='header__options-currency-content'>
                  <GetCurrency
                    propsfunctionSelectCurrency={
                      this.props.propsfunctionSelectCurrency
                    }
                  />
                </div>
              </div>
              <div className='header__options-cart'>
                <button id='header_cart_button' className='header__options-cart--wrapper'>
                  <div className='header__options-quantity'>
                    <span>{this.props.propsOverallQuantity}</span>
                  </div>
                </button>
                {
                  this.handleContentInPopUp()
                }
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
