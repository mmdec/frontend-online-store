import React from 'react';
import propTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getProductDetails } from '../services/api';
import {
  saveCartItem,
  saveRate,
  getRate,
  getCartSize,
} from '../services/handleLocalStorage';
import CartButton from '../components/CartButton';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: {},
      attributes: [],
      email: '',
      rate: '',
      evaluation: '',
      rates: [],
      cartSize: 0,
      freeShipping: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getProductDetails(id).then((response) => this.setState({
      productDetails: response,
      attributes: response.attributes,
      freeShipping: response.shipping.free_shipping,
    }));
    this.loadRatesAndCartSize();
  }

  handleChange =({ target: { name, value } }) => {
    this.setState(() => (
      { [name]: value }
    ));
  }

  submitRate = (event) => {
    event.preventDefault();
    const { email, rate, evaluation, productDetails: { id } } = this.state;
    saveRate(email, rate, evaluation, id);
    this.loadRatesAndCartSize();
  }

  loadRatesAndCartSize = () => {
    this.setState({ rates: getRate(), cartSize: getCartSize() });
  }

  handleClick = () => {
    const { productDetails } = this.state;
    saveCartItem(productDetails);
    this.loadRatesAndCartSize();
  }

  render() {
    const { productDetails,
      attributes, email, rate, evaluation, rates, cartSize, freeShipping } = this.state;
    const { thumbnail,
      title,
      price } = productDetails;
    console.log(productDetails);
    return (
      <section>
        <CartButton size={ cartSize } />
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="product-detail-name">
          { title }
        </h3>
        <h4>
          { price }
        </h4>
        { freeShipping
        && (<p data-testid="free-shipping"> Frete Gratis</p>)}
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleClick }
        >
          <AiOutlineShoppingCart />
          Adicionar ao carrinho
        </button>
        {
          attributes.map((attribute) => (
            <p key={ attribute.id }>{ `${attribute.name}: ${attribute.value_name}` }</p>
          ))
        }
        <form>
          <fieldset>
            <h3>Avaliação</h3>
            <input
              type="email"
              name="email"
              value={ email }
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
            <select name="rate" value={ rate } onChange={ this.handleChange }>
              <option value="1" data-testid="1-rating">1</option>
              <option value="2" data-testid="2-rating">2</option>
              <option value="3" data-testid="3-rating">3</option>
              <option value="4" data-testid="4-rating">4</option>
              <option value="5" data-testid="5-rating">5</option>
            </select>
            <textarea
              name="evaluation"
              data-testid="product-detail-evaluation"
              value={ evaluation }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.submitRate }
            >
              Enviar
            </button>
          </fieldset>
        </form>
        <section>
          {
            rates
            && rates.map((review) => (
              <div key={ review.email }>
                <h4>{review.email}</h4>
                <h5>{review.rate}</h5>
                <p>{review.evaluation}</p>
              </div>
            ))
          }
        </section>
      </section>
    );
  }
}

export default ProductDetails;

ProductDetails.propTypes = {
  match: propTypes.object,
}.isRequired;