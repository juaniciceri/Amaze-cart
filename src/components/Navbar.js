import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/shopping.svg";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
// import { useHistory } from "react-router-dom";
import { auth } from "../config/config";
import { CartContext } from "../global/CartContext";
import { isEmpty } from "lodash";

export const Navbar = ({ user, history }) => {
  const { totalQty } = useContext(CartContext);
  console.log("oook", user);

  const logout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  return (
    <div className="navbox">
      <Link to="/products" className="nav-header navlink">
        <div className="leftside">
          <img className="logo" src={logo} alt="" />
        </div>
        <h1 className="navbox-head">Amaze Cart</h1>
      </Link>

      {!isEmpty(user) && (
        <div className="rightside">
          <div className="cart-user">
            <span className="mr-2">
              <p className="user-name navlink mb-0">
                {user}
              </p>
            </span>
            {user !== "admin1" && (
              <span className="mb-3">
                <Link to="cartproducts">
                  <Icon
                    width="20px"
                    height="20px"
                    icon={cart}
                    className="cart-img"
                  />
                  <span className="no-of-products">{totalQty}</span>
                </Link>
              </span>
            )}
          </div>
          <span>
            {user !== "admin1" && (
              <Link to="cartproducts">
                <button className="logout-btn">MY CART</button>
              </Link>
            )}
            <button className="logout-btn" onClick={logout}>
              LOGOUT
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
