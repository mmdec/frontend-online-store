import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { saveCartItem } from '../services/handleLocalStorage';

class ProductCard extends React.Component {
  handleClick = () => {
    const { data, attCartSize } = this.props;
    saveCartItem(data);
    attCartSize();
  }

  render() {
    const { data, freeShipping } = this.props;
    const { id, title, thumbnail, price } = data;

    return (
      <div>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <section data-testid="product" className="product-card">
            <img src={ thumbnail } alt={ title } />
            <h2>{ title }</h2>
            <h3>
              { `R$ ${price}` }
            </h3>
          </section>
        </Link>
        { freeShipping
        && (<p data-testid="free-shipping"> Frete Gratis</p>)}
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          <AiOutlineShoppingCart />
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

export default ProductCard;

ProductCard.propTypes = {
  id: propTypes.string,
  title: propTypes.string,
  thumbnail: propTypes.string,
  price: propTypes.number,
  freeShipping: propTypes.bool,
}.isRequired;