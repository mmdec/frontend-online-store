import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { getCartSize } from '../services/handleLocalStorage';
import '../App.css';

// imported components
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      search: '',
      currentCategory: '',
      cartSize: 0,
    };
  }

  componentDidMount() {
    getCategories().then((response) => this.setState({ categories: response }));
    this.loadCartSize();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.searchProducts();
  }

  handleChangeCategory = ({ target: { id, name } }) => {
    this.setState({ [name]: id }, this.searchProducts);
  }

  searchProducts = () => {
    const { search, currentCategory } = this.state;
    getProductsFromCategoryAndQuery(currentCategory, search).then(({ results }) => (
      this.setState({ products: results })
    ));
  }

  loadCartSize = () => {
    this.setState({
      cartSize: getCartSize(),
    });
  }

  render() {
    const { categories, search, products, cartSize } = this.state;
    return (
      <section className="container-home">
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            data-testid="query-input"
            name="search"
            type="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </form>
        <CartButton size={ cartSize } />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <section className="container">
          <ul className="category-list">
            {
              categories.map((category) => (
                <li
                  key={ category.id }
                >
                  <label htmlFor={ category.id } data-testid="category">
                    <input
                      type="radio"
                      name="currentCategory"
                      value={ category.id }
                      id={ category.id }
                      onChange={ this.handleChangeCategory }
                    />
                    { category.name }
                  </label>

                </li>))
            }
          </ul>
          <section className="container-products">
            { products.map((product) => (
              <ProductCard
                key={ product.id }
                data={ product }
                attCartSize={ this.loadCartSize }
                freeShipping={ product.shipping.free_shipping }
              />
            ))}
          </section>
        </section>
      </section>
    );
  }
}

export default Home;