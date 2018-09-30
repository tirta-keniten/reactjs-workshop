import React, { Component } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ShoppingCart from './ShoppingCart';

class App extends Component {
  state = {
    cartItems: [],
    products: []
  }

  handleAddItemToCart = product => {
    let cartItems = this.state.cartItems

    const alreadyExists = cartItems.some(
      cartItem => cartItem.product.id === product.id
    )

    if (alreadyExists) {
      cartItems = cartItems.map(cartItem => {
        if (cartItem.product.id === product.id) {
          cartItem.quantity ++
          cartItem.subtotal = product.price * cartItem.quantity
        } 
        return cartItem
      })
    } else {
      cartItems.push({
        product: product,
        quantity: 1,
        subtotal: product.price
      })
    }
    
    this.setState({ cartItems: cartItems })
  }

  handleRemoveItemFromCart = product => {
    let cartItems = this.state.cartItems

    const alreadyExists = cartItems.some(
      cartItem => cartItem.product.id === product.id
    )

    if (alreadyExists) {
      cartItems = cartItems.map(cartItem => {
        if (cartItem.product.id === product.id) {
          cartItem.quantity --
          cartItem.subtotal = product.price * cartItem.quantity
        } 
        return cartItem
      })

      cartItems = cartItems.filter(cartItem => {
        return cartItem.quantity > 0
      })
    }
    
    this.setState({ cartItems: cartItems })
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/wayanjimmy/fe51a80888f0dea356259e476e6aa0d3/raw/4e8663700a8b8400b45382819f08933adf587734/products.json')
      .then(response => response.json())
      .then(products => {
        this.setState({products: products})
      })
  }

  render() {
    return (
<div className="container">
  <Navbar></Navbar>
  <div className="columns">
    <div className="column is-two-thirds">
      <div>
        <h3 className="title">Our Products</h3>
        <div className="columns">

          {this.state.products.map(product => (
            <Product 
              key={product.id} 
              product={product} 
              onAddItemToCart={this.handleAddItemToCart}>
            </Product>
          ))}

        </div>
      </div>
    </div>

    <ShoppingCart cartItems={this.state.cartItems} onRemoveItemFromCart={this.handleRemoveItemFromCart}></ShoppingCart>

  </div>
</div>

    );
  }
}

export default App;
