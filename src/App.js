import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ProductsContextProvider } from "./global/ProductContext";

import { auth, db } from "./config/config";
import { CartContextProvider } from "./global/CartContext";
import { Cart } from "./components/Cart";
import { CheckOut } from "./components/CheckOut";
import { NotFound } from "./components/NotFound";
import { Products } from "./components/Products";
import AddProducts from "./components/AddProducts";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

import "./css/Home.css";
import Footer from "./components/Footer";

const history = createBrowserHistory();

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (
        user &&
        (history.location.pathname === "/products" ||
          history.location.pathname === "/checkout" ||
          history.location.pathname === "/cartproducts" ||
          history.location.pathname === "/addproducts")
      ) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.setState({
              user: snapshot.data().Name,
            });
          });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }
  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <Router history={history} forceRefresh={true}>
            <Navbar user={this.state.user} history={history} />

            <Switch>
              <Route
                exact
                path="/"
                component={() => <Signup history={history} />}
              />
              <Route
                path="/login"
                component={() => <Login history={history} />}
              />
              <Route
                path="/cartproducts"
                component={() => (
                  <Cart user={this.state.user} history={history} />
                )}
              />
              <Route
                path="/checkout"
                component={() => (
                  <CheckOut user={this.state.user} history={history} />
                )}
              />
              <Route
                exact
                path="/products"
                component={() => (
                  <Products user={this.state.user} history={history} />
                )}
              />
              <Route
                exact
                path="/addproducts"
                component={() => <AddProducts user={this.state.user} />}
              />
              <Route component={NotFound} />
            </Switch>
            <Footer user={this.state.user} />
          </Router>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
