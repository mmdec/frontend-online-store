import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import propTypes from 'prop-types';

class CartButton extends Component {
  render() {
    const { size } = this.props;
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <button type="button">
          <AiOutlineShoppingCart />
        </button>
        <p
          data-testid="shopping-cart-size"
        >
          {size}

        </p>
      </Link>
    );
  }
}

export default CartButton;

CartButton.propTypes = {
  size: propTypes.number,
}.isRequired;