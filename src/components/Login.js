import React, { useState } from "react";
import { auth } from "../config/config";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { DesktopWindows } from "@material-ui/icons";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("inlogin", data);
        setEmail("");
        setPassword("");
        setError("");
        props.history.push("/products");
        window.location.reload(false);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className=" login-outer">
      <div className="login-inner">
        <br />
        <h2 className="login-header">LOGIN</h2>
        <br />
        <form autoComplete="off" className="form-group" onSubmit={login}>
          <TextField
            type="email"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="form-control"
          />
          <p></p>
          <br></br>

          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="form-control"
          />
          <p></p>
          <br></br>
          <center>
            <button type="submit" className="btn btn-success btn-md mybtn">
              LOGIN
            </button>
          </center>
        </form>
        {error && <span className="error-msg">{error}</span>}
        <br />
        <center>
          <span>
            Don't have an account? Register
            <Link to="/"> Here</Link>
          </span>
        </center>
      </div>
    </div>
  );
};
