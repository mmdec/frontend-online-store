import React, { Component } from 'react';
import propTypes from 'prop-types';
import { attQuantityToBuy, getCartItem } from '../services/handleLocalStorage';

class CartProductCard extends Component {
  constructor() {
    super();

    this.state = { quantity: 1, isBtnDisabled: false };
  }

  componentDidMount() {
    this.loadQuantityToBuy();
  }

  increaseQuantity = () => {
    const { data: { id } } = this.props;

    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }), () => {
      const { quantity } = this.state;
      attQuantityToBuy(id, quantity);
      this.validationBtn();
    });
  }

  decreaseQuantity = () => {
    const { data: { id } } = this.props;

    this.setState((prevState) => ({
      quantity: prevState.quantity === 1 ? prevState.quantity : prevState.quantity - 1,
    }), () => {
      const { quantity } = this.state;
      this.validationBtn();
      attQuantityToBuy(id, quantity);
    });
  }

  loadQuantityToBuy = () => {
    const { data: { id } } = this.props;
    const savedItems = getCartItem();
    const currentItem = savedItems.find((item) => item.id === id);

    this.setState({ quantity: currentItem.quantityToBuy });
  }

  validationBtn = () => {
    const { quantity } = this.state;
    const { availableQuantity } = this.props;
    if (quantity === availableQuantity) {
      this.setState({ isBtnDisabled: true });
    } else {
      this.setState({ isBtnDisabled: false });
    }
  }

  render() {
    const { data, index, onRemove } = this.props;
    const { title, price, thumbnail } = data;
    const { quantity, isBtnDisabled } = this.state;
    return (
      <section>
        <button
          type="button"
          onClick={ () => onRemove(index) }
        >
          x
        </button>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.decreaseQuantity }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">
          {`Quantidade: ${quantity}`}
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.increaseQuantity }
          disabled={ isBtnDisabled }
        >
          +
        </button>
        <p>{ price }</p>
      </section>
    );
  }
}

export default CartProductCard;

CartProductCard.propTypes = {
  title: propTypes.string,
  price: propTypes.number,
  thumbnail: propTypes.string,
  availableQuantity: propTypes.number,
}.isRequired;