import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// imported components
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:id" component={ ProductDetails } />
          <Route path="/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;