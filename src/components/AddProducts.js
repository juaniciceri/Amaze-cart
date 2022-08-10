import React, { useState, useEffect } from "react";
import { storage, db } from "../config/config";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { auth } from "../config/config";

const AddProducts = ({ user }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; //image types setting

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email !== "admin1@gmail.com") {
        history.push("/login");
      }
      if (!user) {
        history.push("/login");
      }
    });
  });

  //image handler for correct types only to accept
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select the valid image type png or jpeg");
    }
  };
  //handling the products values
  const addProducts = (e) => {
    e.preventDefault();
    //console.log("items",productName,productPrice,productImg);
    //storing the image in firebase db
    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        //getting product URL and if success thenstoring the product in db
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: url,
              })
              .then(() => {
                setProductName("");
                setProductPrice(0);
                setProductImg("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };
  return (
    <div className="container addproducts-page">
      <br />
      <h2 className="products">ADD PRODUCTS</h2>
      <form autoComplete="off" className="form-group" onSubmit={addProducts}>
        <TextField
          type="text"
          htmlFor="product-name"
          label="Product Name"
          variant="outlined"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          required
          className="form-control"
        />
        <p></p>
        <br></br>
        <TextField
          type="number"
          htmlFor="product-price"
          label="Product Price"
          variant="outlined"
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          required
          className="form-control"
        />
        <p></p>
        <br></br>
        <input
          type="file"
          label="Product Image"
          onChange={productImgHandler}
          id="file"
          required
          className="form-control"
        />
        <button className="btn btn-success btn-md mybtn mt-3">ADD</button>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};
export default AddProducts;
