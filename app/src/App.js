import React, { Component } from 'react';
import Header from './Components/Layout/Header/Header';
import ProductsList from './Components/Products/ProductsList';
import PDP from './Components/PDP/PDP';
import Cart from './Components/Cart/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedCurrency = this.handleSelectedCurrency.bind(this);
    this.handlePDP = this.handlePDP.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.handleViews = this.handleViews.bind(this);
    this.handleSetView = this.handleSetView.bind(this);
    this.handleZeroIndexLength = this.handleZeroIndexLength.bind(this);
    this.setProductQuantity = this.setProductQuantity.bind(this);
    this.handleProductQuantityIncrease = this.handleProductQuantityIncrease.bind(this);
    this.handleProductQuantityDecrease = this.handleProductQuantityDecrease.bind(this);
    this.handleOverallPrice = this.handleOverallPrice.bind(this);
    this.handleOverallQuantity = this.handleOverallQuantity.bind(this);
    this.handleTaxes = this.handleTaxes.bind(this);
    this.handleProductCategory = this.handleProductCategory.bind(this);
    this.state = {
      appSelectedViews: 'Home',
      appCurrentCurrency: '$',
      appCurrentCurrencyIndex: 0,
      appSelectedProductPDP: null,
      appCartLength: null,
      appSameproduct: null,
      appProductQuantity: [],
      appCart: [],
      appOverallPrice: 0,
      appOverallQuantity: 0,
      appTaxes: 0,
      appProductCategory: 'all'
    };
  }


  //Update product category
  handleProductCategory = (e, props) => {
    this.setState({ appProductCategory: props });
    this.handleCateogryInderline(e);
  }

  handleCateogryInderline = (e) => {
    let headerLinkDOM = document.getElementsByClassName('header__link-list');
    for (let i = 0; i < headerLinkDOM.length; i++) {
      headerLinkDOM[i].children[0].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  //Updates the view variable
  //Updates the view variable
  handleSetView = (props) => {
    this.setState({ appSelectedViews: props })
  }
  //Updates currency symbol
  //Updates currency index for price array in product object
  handleSelectedCurrency = (props, index) => {
    this.setState({ appCurrentCurrency: props });
    this.setState({ appCurrentCurrencyIndex: index }, () => {
      this.handleOverallQuantity();
      this.handleOverallPrice();
    });
  };
  //Selects the product and adds it to state variable
  handlePDP = (props) => {
    this.setState({ appSelectedProductPDP: props }, () => {
      console.log(props);
    });
    this.handleSetView('PDP');
  };
  //Adds the special indexes for the each image in cart
  handleZeroIndexLength = () => {
    const indexCartArray = [];
    for (let i = 0; i < this.state.appCart.length; i++) {
      indexCartArray.push(0);
    }
    this.setState({ appCartLength: indexCartArray });
  }
  //Adds at the start the amount of particular products in the cart
  setProductQuantity = () => {
    const productLengthArray = [...this.state.appProductQuantity];
    if (productLengthArray.length < this.state.appCart.length) {
      productLengthArray.push(1);
      this.setState({ appProductQuantity: productLengthArray }, () => {
        this.handleOverallQuantity();
        this.handleOverallPrice();
      });
    }
  }
  //Increase product quantity in cart
  handleProductQuantityIncrease = (props) => {
    const productQuantityArray = [...this.state.appProductQuantity];
    let singleArrayVariable = productQuantityArray[props] + 1;
    productQuantityArray.splice(props, 1, singleArrayVariable);
    this.setState({ appProductQuantity: productQuantityArray }, () => {
      this.handleOverallQuantity();
      this.handleOverallPrice();
    });
  }

  //Decrease product quantity in cart
  handleProductQuantityDecrease = (props) => {
    const productQuantityArray = [...this.state.appProductQuantity];
    let singleArrayVariable = productQuantityArray[props] - 1;
    productQuantityArray.splice(props, 1, singleArrayVariable);
    if (!singleArrayVariable <= 0) {
      this.setState({ appProductQuantity: productQuantityArray }, () => {
        this.handleOverallQuantity();
        this.handleOverallPrice();
      });
    }
  }

  handleTaxes = (propsTax, propsTotalPrice) => {
    let taxCounter = 0;
    taxCounter = parseFloat(propsTax) * parseFloat(propsTotalPrice) / 100;
    this.setState({ appTaxes: (taxCounter).toFixed(2) });
  }

  handleOverallQuantity = () => {
    let overallProductQuantity = 0;
    for (let i = 0; i < this.state.appCart.length; i++) {
      overallProductQuantity += parseFloat(this.state.appProductQuantity[i]);
    }
    this.setState({ appOverallQuantity: overallProductQuantity }, () => {
      this.handleTaxes(21, this.state.appOverallPrice);
      this.handleQunatityIndicator();
    });
  }

  handleOverallPrice = () => {
    let overallPriceCounter = 0;
    for (let i = 0; i < this.state.appCart.length; i++) {
      overallPriceCounter += parseFloat(this.state.appProductQuantity[i]) * parseFloat(this.state.appCart[i].selectedProduct.prices[this.state.appCurrentCurrencyIndex].amount);
    }
    this.setState({ appOverallPrice: (overallPriceCounter).toFixed(2) });
  }

  handleRemoveProduct = (props) => {
    const productQuantityArray = [...this.state.appProductQuantity];
    const cartArray = [...this.state.appCart];
    cartArray.splice(props, 1);
    productQuantityArray.splice(props, 1);
    this.setState({ appProductQuantity: productQuantityArray });
    this.setState({ appCart: cartArray }, () => {
      this.handleOverallQuantity();
      this.handleOverallPrice();
      this.handleQunatityIndicator();
    });
  }

  handleCart = (parSelectedProduct, parSelectedProductAttributes, parSelectedProductColor) => {
    const cartArray = [...this.state.appCart];
    let isTheProductWithTheSameAttribute;
    let isTheProductWithTheSameColor;
    let arrayAttributesLength;
    let arrayColorLength;
    let counter;

    if (cartArray.length >= 1) {
      arrayAttributesLength = cartArray.length;
      arrayColorLength = cartArray.length;
      for (let i = 0; i < arrayAttributesLength; i++) {
        isTheProductWithTheSameAttribute = true;
        if (cartArray[i].selectedProduct.id != parSelectedProduct.id) {
          isTheProductWithTheSameAttribute = false;
          isTheProductWithTheSameColor = false;
        }
        else {
          counter = null;
          for (let l = 0; l < cartArray[i].selectedProductAttributes.length; l++) {
            if (String(cartArray[i].selectedProductAttributes[l]) == String(parSelectedProductAttributes[l])) {
              counter++;
              if (counter == cartArray[i].selectedProductAttributes.length) {
                arrayAttributesLength = i;
                isTheProductWithTheSameAttribute = true;
                this.handleProductQuantityIncrease(i);
              }
            }
            else {
              isTheProductWithTheSameAttribute = false;
            }
          }
        }
      }
      //for the color
      for (let i = 0; i < arrayColorLength; i++) {
        isTheProductWithTheSameColor = true;
        if (String(cartArray[i].selectedProductColor) == String(parSelectedProductColor)) {
          isTheProductWithTheSameColor = true;
          arrayColorLength = i;
        } else {
          isTheProductWithTheSameColor = false;
        }
      }
    } else {
      isTheProductWithTheSameAttribute = false;
      isTheProductWithTheSameColor = false;
    }

    if (!isTheProductWithTheSameAttribute || !isTheProductWithTheSameColor) {
      cartArray.push({
        selectedProduct: parSelectedProduct,
        selectedProductAttributes: parSelectedProductAttributes,
        selectedProductColor: parSelectedProductColor
      });
      this.setState({ appCart: cartArray }, () => {
        this.setProductQuantity();
        this.handleOverallQuantity();
        this.handleOverallPrice();
        this.handleZeroIndexLength();
        this.handleSetView('Cart');
      });
    } else {
      this.handleZeroIndexLength();
      this.handleSetView('Cart');
    }
  };

  handleQunatityIndicator = () => {
    const cartIndicatorDOM = document.getElementById('header_cart_button');
    if (this.state.appOverallQuantity > 0) {
      cartIndicatorDOM.classList.add('active');
    } else {
      cartIndicatorDOM.classList.remove('active');
    }
  }

  handleViews = () => {
    switch (this.state.appSelectedViews) {
      case 'Home':
        return <ProductsList
          clickFunction={this.handlePDP}
          propsCurrentCurrency={this.state.appCurrentCurrency}
          propsCurrentCurrencyIndex={this.state.appCurrentCurrencyIndex}
          propsProductCategory={this.state.appProductCategory}>
        </ProductsList>
      case 'PDP':
        return <PDP
          propsCurrentCurrency={this.state.appCurrentCurrency}
          propsCurrentCurrencyIndex={this.state.appCurrentCurrencyIndex}
          propsSelectedProduct={this.state.appSelectedProductPDP}
          clickFunction={this.handleCart}>
        </PDP>
      case 'Cart':
        return <Cart
          propsCurrentCurrency={this.state.appCurrentCurrency}
          propsCurrentCurrencyIndex={this.state.appCurrentCurrencyIndex}
          propsCartArrayZeroIndex={this.state.appCartLength}
          propsCartProduct={this.state.appCart}
          propsProductQuantity={this.state.appProductQuantity}
          propsTaxes={this.state.appTaxes}
          propsOverallQuantity={this.state.appOverallQuantity}
          propsOverallprice={this.state.appOverallPrice}
          functionProductQuantityIncrease={this.handleProductQuantityIncrease}
          functionProductQuantityDecrease={this.handleProductQuantityDecrease}
          functionProductRemove={this.handleRemoveProduct}>
        </Cart>
    }
  }

  render() {
    return (
      <div className='wrapper-page-header-and-content'>
        <Header
          functionSetView={this.handleSetView}
          propsCurrentCurrency={this.state.appCurrentCurrency}
          propsfunctionSelectCurrency={this.handleSelectedCurrency}
          propsOverallQuantity={this.state.appOverallQuantity}
          propsCurrentCurrencyIndex={this.state.appCurrentCurrencyIndex}
          propsCartArrayZeroIndex={this.state.appCartLength}
          propsCartProduct={this.state.appCart}
          propsProductQuantity={this.state.appProductQuantity}
          propsTaxes={this.state.appTaxes}
          propsOverallprice={this.state.appOverallPrice}
          functionProductQuantityIncrease={this.handleProductQuantityIncrease}
          functionProductQuantityDecrease={this.handleProductQuantityDecrease}
          functionProductRemove={this.handleRemoveProduct}
          functionProductCategory={this.handleProductCategory}>
        </Header>

        <div className='wrapper-page-content'>
          {
            this.handleViews()
          }
        </div>
      </div>
    );
  }
}

export default App;
