import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  console.log("navbar");

  return (
    <Fragment>
      <nav
        className="blue"
        style={{
          // add custom css
          // backgroundColor: "#98c5e9",
          // boxShadow: "none",
          // padding: "10px 0",
          // borderBottom: "2px solid #00285e",
        }}
      >
        <div className="nav-wrapper container">
          <a href="#!" className="brand-logo">
            Order Taker
          </a>
          <a href="#/" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/dashboard/my_orders">My orders</Link>
            </li>
            <li>
              <Link to="/dashboard/new_order">New order</Link>
            </li>
            <li>
              <Link to="/dashboard/price_list">Price list</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/dashboard/my_orders" className="sidenav-close">
            My orders
          </Link>
        </li>
        <li>
          <Link to="/dashboard/new_order" className="sidenav-close">
            New order
          </Link>
        </li>
        <li>
          <Link to="/dashboard/price_list" className="sidenav-close">
            Price list
          </Link>
        </li>
        <li>
          <Link to="/logout" className="sidenav-close">
            Log out
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
