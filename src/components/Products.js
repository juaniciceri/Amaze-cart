import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import { auth } from "../config/config";
import { Link } from "react-router-dom";

export const Products = ({ user, history }) => {
  const { products } = useContext(ProductsContext);
  const [searchText, setSearchText] = useState("");
  const [displayList, setDisplayList] = useState(products);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
    if (searchText) {
      let data = products.filter(function (product) {
        return product.ProductName.toLocaleLowerCase().includes(
          searchText.toLocaleLowerCase()
        );
      });

      setDisplayList(data);
    } else {
      setDisplayList(products);
    }
  }, [history, searchText]);

  // const data = useContext(CartContext);
  console.log(user);
  const { dispatch } = useContext(CartContext);

  return (
    <div className="product-pg ">
      {products.length !== 0 && (
        <div className=" search d-flex justify-content-between align-items-center pr-4">
          <p className="products">{user === "admin1" && "ADD"} PRODUCTS</p>
          <div>
            {user !== "admin1" && (
              <input
                type="text"
                className="search-text"
                placeholder="Search by product name"
                onChange={(e) => setSearchText(e.target.value)}
              />
            )}
          </div>
        </div>
      )}
      <div className="products-page">
        {user === "admin1" && (
          <center>
          <Link to="/addproducts">
            <button className="logout-btn btn-addproducts">ADD PRODUCTS</button>
          </Link>
          </center>
        )}
        {user !== "admin1" && (
          <div className="products-container">
            {displayList.length === 0 && <div>No products to display</div>}
            {displayList.map((product) => (
              <div className="product-card" key={product.ProductID}>
                <div className="product-img">
                  <img src={product.ProductImg} alt="not found" />
                </div>
                <div className="product-name">{product.ProductName}</div>
                <div className="product-price">
                  $ {product.ProductPrice}.00
                </div>
                <Button
                  id="addcart"
                  className="addcart-btn"
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      id: product.ProductID,
                      product,
                    });
                  }}
                  alignSelf="flex-end"
                >
                  Add to cart
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
