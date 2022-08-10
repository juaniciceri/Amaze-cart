import React, { useContext, useEffect } from "react";
import { CartContext } from "../global/CartContext";
import { Icon } from "react-icons-kit";
import { ic_add } from "react-icons-kit/md/ic_add";
import { ic_remove } from "react-icons-kit/md/ic_remove";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";
import { Link } from "react-router-dom";
import { auth } from "../config/config";

export const Cart = ({ user, history }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
    CartContext
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  });
  return (
    <div className="cart-container">
      {shoppingCart.length === 0 && (
        <>
          <h3 className="no-items">Your cart is Empty!</h3>
          <h5 className="add-items">Add items to it now.</h5>
          <div>
            <Link to="/products">
              <button className="shop-now-btn">SHOP NOW!</button>
            </Link>
          </div>
        </>
      )}
      {shoppingCart &&
        shoppingCart.map((cart) => (
          <div className="cart-card" key={cart.ProductID}>
            <div className="cart-img">
              <img src={cart.ProductImg} alt="not found" />
            </div>

            <div className="cart-name">{cart.ProductName}</div>

            <div className="cart-price-orignal">$ {cart.ProductPrice}.00</div>

            <div
              className="inc"
              onClick={() =>
                dispatch({ type: "INC", id: cart.ProductID, cart })
              }
            >
              <Icon icon={ic_add} size={24} />
            </div>

            <div className="quantity">{cart.qty}</div>

            <div
              className="dec"
              onClick={() =>
                dispatch({ type: "DEC", id: cart.ProductID, cart })
              }
            >
              <Icon icon={ic_remove} size={24} />
            </div>

            <div className="cart-price">$ {cart.TotalProductPrice}.00</div>

            <button
              className="delete-btn"
              onClick={() =>
                dispatch({ type: "DELETE", id: cart.ProductID, cart })
              }
            >
              <Icon icon={iosTrashOutline} size={24} />
            </button>
          </div>
        ))}
      {shoppingCart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-heading">Cart-Summary</div>
          <div className="cart-summary-price">
            <span>Total Price</span>
            <span>{totalPrice}</span>
          </div>
          <div className="cart-summary-price">
            <span>Total Qty</span>
            <span>{totalQty}</span>
          </div>
          <Link to="checkout" className="cashout-link">
            <button
              className="btn btn-success btn-md"
              style={{ marginTop: 5 + "px" }}
            >
              Cash on delivery
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
