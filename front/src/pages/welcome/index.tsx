import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Button from "../../component/button";
import Page from "../../component/page";

const WelcomePage = () => {
  // const styles = {
  //   background: `url("/public/money.png") transparent 50% / cover no-repeat`,
  // };
  return (
    <Page>
      <div className="money"></div>
      <div className="rectangle">
        <div className="mesh"></div>
      </div>
      <h1>Hello!</h1>
      <p>Welcome to Bank App</p>

      <div className="buttons">
        <Link className="linkstyle" to="/signup">
          <Button>Sign Up</Button>
        </Link>

        <Link className="linkstyle" to="/signin">
          <Button type="button-white">Sign In</Button>
        </Link>
      </div>
    </Page>
  );
};

export default WelcomePage;
