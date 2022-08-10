import React, { useState } from "react";
import { auth, db } from "../config/config";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

export const Signup = (props) => {
  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // signup
  const signup = (e) => {
    e.preventDefault();
    if(password===confirmPassword){
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("SignedUpUsersData")
          .doc(cred.user.uid)
          .set({
            Name: name,
            Email: email,
            Password: password,
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
    }
    else{
      alert("Please check password correctly");
    }
  };

  return (
    <div className="login-outer">
      <div className="login-inner">
        <br />
        <h2 className="login-header">SIGN UP</h2>
        <br />
        <form autoComplete="off" className="form-group" onSubmit={signup}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="form-control"
          />
          <p></p>
          <br></br>
          <TextField
            type="email"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            required
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            className="form-control"
            required
          />
          <p></p>
          <br></br>
           <TextField
            type="password"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="form-control"
            required
          />
          <p></p>
          <br></br>
          <center>
            <button type="submit" className="btn btn-success btn-md mybtn">
              SUBMIT
            </button>
          </center>
        </form>
        {error && <span className="error-msg">{error}</span>}
        <br />
        <center>
          <span className="login-header">
            Already have an account? Login
            <Link to="/login"> Here</Link>
          </span>
        </center>
      </div>
    </div>
  );
};
