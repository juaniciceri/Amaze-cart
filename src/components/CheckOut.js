import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../config/config";
import { CartContext } from "../global/CartContext";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import thanks from "../thank.png";

export const CheckOut = ({ history }) => {
  const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(
    CartContext
  );

  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            setName(snapshot.data().Name);
            setEmail(snapshot.data().Email);
          });
      } else {
        history.push("/login");
      }
    });
  });

  const cashoutSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const date = new Date();
        const time = date.getTime();
        db.collection("Buyer-info " + user.uid)
          .doc("_" + time)
          .set({
            BuyerName: name,
            BuyerEmail: email,
            BuyerCell: cell,
            BuyerAddress: address,
            BuyerPayment: totalPrice,
            BuyerQuantity: totalQty,
          })
          .then(() => {
            db.collection("Buyer-info " + user.uid).onSnapshot((snapshot) => {
              let changes = snapshot.docChanges();
              changes.forEach((change) => {
                if (change.type === "added") {
                  shoppingCart.forEach((cart) => {
                    db.collection(user.uid + change.doc.id)
                      .add(cart)
                      .then(() => {
                        setCell("");
                        setAddress("");
                        dispatch({ type: "EMPTY" });
                        setSuccessMsg(
                          "Your order has been placed successfully."
                        );
                      })
                      .catch((err) => setError(err.message));
                  });
                }
              });
            });
          })
          .catch((err) => setError(err.message));
      }
    });
  };

  return (
    <>
      {error && <span>{error}</span>}
      <div className="container">
        <br />
        <h2 className="cash-head">Cashout Details</h2>
        <br />
        {successMsg && (
          <div className="success-msg">
            {successMsg}{" "}
            <Link to="/products" className="home-link">
              Return to HOME
            </Link>
            <div>
          <img className="thank-img" src={thanks} alt="not found" />
        </div>
          </div>
        )}
        {!successMsg && (
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={cashoutSubmit}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={name}
              disabled
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              disabled
            />
            <br />
            <TextField
              type="number"
              htmlFor="product-name"
              label="Phone Number"
              variant="outlined"
              onChange={(e) => setCell(e.target.value)}
              value={cell}
              placeholder="eg 03123456789"
              required
              className="form-control"
            />
            <p></p>
            <br></br>
            <TextField
              type="text"
              htmlFor="product-name"
              label="Delivery Address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              className="form-control"
            />
            <p></p>
            <br></br>
            <label htmlFor="Price To Pay">Price To Pay</label>
            <input
              type="number"
              className="form-control"
              required
              value={totalPrice}
              disabled
            />
            <br />
            <label htmlFor="Total No of Products">Total No of Products</label>
            <input
              type="number"
              className="form-control"
              required
              value={totalQty}
              disabled
            />
            <br />
            <button type="submit" className="btn btn-success btn-md mybtn">
              SUBMIT
            </button>
          </form>
        )}
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};
