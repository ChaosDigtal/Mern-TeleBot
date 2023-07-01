import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const login = () => {
    if (username === "fly15" && password === "fly15support") {
      setAuthenticated(true);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <div className="container">
      <Dialog
        header="Warning"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p className="m-0">
          The username or password is incorrect!
        </p>
      </Dialog>
      {authenticated && <Navigate to="/dashboard"></Navigate>}
      <div>
        <label className="text-xl"> Welcome </label>
      </div>
      <div className="card flex justify-content-center username">
        <span className="p-float-label inline-block">
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </span>
      </div>
      <div className="card flex justify-content-center password">
        <span className="p-float-label inline-block">
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </span>
      </div>
      <div className="card flex justify-content-center login">
        <Button label="Log in" icon="pi pi-sign-in" onClick={login} />
      </div>
    </div>
  );
}

export default Login;
