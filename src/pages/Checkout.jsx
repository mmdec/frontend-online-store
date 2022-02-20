import React, { Component } from 'react';
import { AiOutlineBarcode, AiFillCreditCard } from 'react-icons/ai';
import propTypes from 'prop-types';
import { getCartItem, getTotalPrice } from '../services/handleLocalStorage';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.loadProductsAndPrice();
  }

  loadProductsAndPrice = () => {
    this.setState({ products: getCartItem(), totalPrice: getTotalPrice() });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    localStorage.removeItem('items');
    history.push('/');
  }

  render() {
    const { products, totalPrice } = this.state;
    return (
      <section>
        <section>
          {
            products.map((product) => (
              <div key={ product.id }>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.title }</p>
                <p>{ product.quantityToBuy }</p>
                <p>{ product.price}</p>
              </div>
            ))
          }
          <h2>{`Valor total: ${totalPrice}`}</h2>
        </section>

        <form style={ { marginTop: 50 } } onSubmit={ this.handleSubmit }>
          <fieldset style={ { padding: 20 } }>
            <legend>Informações do Comprador</legend>
            <input
              type="text"
              name="name"
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              required
            />
            <input
              type="email"
              name="email"
              data-testid="checkout-email"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              placeholder="CPF"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              data-testid="checkout-phone"
              placeholder="Telefone"
              required
            />
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              placeholder="CEP"
              required
            />
            <input
              type="text"
              name="address"
              data-testid="checkout-address"
              placeholder="Endereço"
              required
            />
          </fieldset>
          <fieldset style={ { padding: 20 } }>
            <legend>Método de pagamento</legend>
            <label htmlFor="boleto">
              <input type="radio" name="pay-method" value="boleto" id="boleto" required />
              <AiOutlineBarcode />
            </label>

            <label htmlFor="credit-card">
              <input
                type="radio"
                name="pay-method"
                value="cartao"
                id="credit-card"
                required
              />
              <AiFillCreditCard />
            </label>
          </fieldset>

          <button type="submit">Finalizar compra</button>
        </form>

      </section>
    );
  }
}

export default Checkout;

Checkout.propTypes = {
  history: propTypes.object,
}.isRequired;