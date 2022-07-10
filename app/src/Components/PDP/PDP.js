import React, { Component } from 'react';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = {
      pdpChangedImage: this.props.propsSelectedProduct.gallery[0],
      addProductToCart: null,
      selectedColor: '',
      selectedAttributesArray: []
    };
  }

  handleSelection = (props, element, pdpAttributesListIndex) => {
    let selectedAttributesDOM = document.getElementsByClassName(element);

    const array = [...this.state.selectedAttributesArray];
    
    if (array.length != this.props.propsSelectedProduct.attributes.length) {
      for (let i = 0; i < this.props.propsSelectedProduct.attributes.length; i++) {
        array.push([]);
      }
    }

    if (element == 'Color') {
      const colorClassDOM = document.getElementsByClassName('block-color');
      for (let obj of colorClassDOM) {
        obj.classList.remove('active');
      }
      const colorDOM = document.getElementById('color__' + props);
      colorDOM.classList.add('active');
      this.setState({ selectedColor: props });
    } else {
      for (let i = 0; i < this.props.propsSelectedProduct.attributes.length; i++) {
        if (this.props.propsSelectedProduct.attributes[i].id == element) {
          for (let obj of selectedAttributesDOM) {
            obj.classList.remove('active');
          }
          const attributesID = document.getElementById('attributes__' + props + '_' + pdpAttributesListIndex);
          attributesID.classList.add('active');
          array.splice(pdpAttributesListIndex, 1, [props]);
          this.setState({ selectedAttributesArray: array });
        }
      }
    }
  };

  handleChangeImage = (props) => {
    this.setState({ pdpChangedImage: props });
  };

  handleAddToCart = () => {
    let attribute = this.props.propsSelectedProduct.attributes;
    var counter = 0;
    for (let index = 0; index < attribute.length; index++) {
      if (attribute[index].id == 'Color') {
        for (let k = 0; k < attribute[index].items.length; k++) {
          if (document.getElementById('color__' + attribute[index].items[k].value + '').classList.contains('active')) {
            counter++;
          }
        }
      }
      else {
        for (let k = 0; k < attribute[index].items.length; k++) {
          if (document.getElementById('attributes__' + attribute[index].items[k].value + '_' + index + '').classList.contains('active')) {
            counter++;
          }
        }
      }
    }

    if (counter == attribute.length) {
      this.setState({
        addProductToCart: this.props.propsSelectedProduct
        
      }, () => {     
        this.props.clickFunction(this.state.addProductToCart, this.state.selectedAttributesArray, this.state.selectedColor);
      });
    }
  };

  render() {
    return (
      <div className='block-pdp'>
        <div className='container'>
          <div className='pdp__wrapper'>
            {/* Image Clicker */}
            <div className='pdp__image-clicker'>
              <div className='pdp__image-clicker-right'>
                {this.props.propsSelectedProduct.gallery.map((val, index) => (
                  <div
                    key={index}
                    onClick={() => this.handleChangeImage(val)}
                    className='image'
                    style={{
                      backgroundImage: `url(${val})`,
                    }}
                  ></div>
                ))}
              </div>
              <div className='pdp__image-clicker-main'>
                <div
                  className='image'
                  style={{
                    backgroundImage: `url(${this.state.pdpChangedImage})`,
                  }}
                ></div>
              </div>
            </div>
            <div className='pdp__attributes'>
              <div className='wrapper-text brand'>
                <h4>
                  {this.props.propsSelectedProduct.brand}
                </h4>
              </div>
              <div className='wrapper-text title'>
                <span className='styled-as-p3'>
                  {this.props.propsSelectedProduct.name}
                </span>
              </div>
              {this.props.propsSelectedProduct.attributes.map((valAttributes, indexAttributesList) => (
                <div key={valAttributes.id} className={valAttributes.id == 'Color' ? 'block-color-list mb-40' : 'block-attributes-list mb-20'}>
                  <div className='wrapper-title mb-8'>
                    <span className='styled-as-p1'>{valAttributes.name}</span>
                  </div>
                  <div className={valAttributes.id == 'Color' ? 'color__list-wrapper' : 'attributes__list-wrapper'}>
                    {valAttributes.items.map((val, index) => (
                      <div
                        key={val.id}
                        onClick={() => this.handleSelection(val.value, valAttributes.id, indexAttributesList)}
                        id={valAttributes.id == 'Color' ? 'color__' + val.value + '' : 'attributes__' + val.value + '_' + indexAttributesList + ''}
                        className={valAttributes.id == 'Color' ? 'block-color' : 'block-attributes ' + valAttributes.name + ''}
                        style={valAttributes.id == 'Color' ? { backgroundColor: val.value } : { backgroundColor: '' }}>
                        <span className={valAttributes.id == 'Color' ? 'color__inner-element' : 'attributes__inner-element'}>
                          {valAttributes.id == 'Color' ? '' : val.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>)
              )}
              <div className='wrapper-text mb-8'>
                <span className='styled-as-p1'>price</span>
              </div>
              <div className='pdp__price mb-20'>
                <span className='styled-as-p2'>
                  {this.props.propsSelectedProduct.prices[this.props.propsCurrentCurrencyIndex].currency.symbol}{' '}{this.props.propsSelectedProduct.prices[this.props.propsCurrentCurrencyIndex].amount}
                </span>
              </div>
              <div className='wrapper-button mb-40'>
                <button onClick={() => this.handleAddToCart()} className='button button-primary'>add to cart</button>
              </div>
              <div className='wrapper-text' dangerouslySetInnerHTML={{ __html: this.props.propsSelectedProduct.description }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
