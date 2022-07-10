import React, { Component } from 'react'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: null
    }
  }

  

  render() {
    return (
      <li onClick={this.props.functionProductCategory} className='header__link-list'>
        <a className='header__link' href='#'>
          {this.props.propsCategoryName}
        </a>
      </li>
    )
  }
}

export default Categories;