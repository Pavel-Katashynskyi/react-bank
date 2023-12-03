import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Button from "./component/button";

function App() {
  return (
    <div>
      <div className="money"></div>
      <div className="rectangle">
        <div className="mesh"></div>
      </div>

      <h1>Hello!</h1>
      <p>Welcome to Bank App</p>

      <div className="button">
        <Link className="linkstyle" to="/signup">
          <Button>Sign Up</Button>
        </Link>

        <Link className="linkstyle" to="/signin">
          <Button type="button-white">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
