import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCartItem, removeCartItem } from '../services/handleLocalStorage';
import CartProductCard from '../components/CartProductCard';

class CartButton extends Component {
  constructor() {
    super();

    this.state = { products: [] };
  }

  componentDidMount() {
    this.loadItemsState();
  }

  onRemove = (id) => {
    removeCartItem(id);
    this.setState({ products: [] }, this.loadItemsState);
  }

  loadItemsState = () => {
    this.setState({ products: getCartItem() });
  }

  render() {
    const { products } = this.state;

    if (products === null) {
      return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    }

    return (
      <>
        {products.map((product, index) => (
          <CartProductCard
            key={ product.id }
            index={ index }
            data={ product }
            onRemove={ this.onRemove }
            availableQuantity={ product.available_quantity }
          />
        ))}

        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
      </>
    );
  }
}

export default CartButton;