import React, { useEffect, useState } from "react";
import logo from "../../assets/Tafi_logo_white.png";

import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo-section col-2">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="link-section col-7 justify-content-around">
          <Link to="/">
            <span>Home </span>
          </Link>
          <Link to="/shopPage">
            <span>Shop</span>
          </Link>
          <Link to="/services">
            <span>Service </span>
          </Link>
          <Link to="/about">
            <span>About Us</span>
          </Link>
          <Link to="/franchise">
            <span>Exclusive Store</span>
          </Link>
          <Link to="/blog">
            <span>Resource center</span>
          </Link>
        </div>
        <div className="login-section col-3">
          <Link className="register" to={`/auth/register`}>
            Register
          </Link>
          <Link className="signin" to={`/auth/login`}>
            Sign In
          </Link>
          {user && user.role.role === 'User' && <Link className="register myaccount" to={"/myaccount"}>
            My account
          </Link>}
        </div>
      </div>
    </>
  );
};

export default Header;
