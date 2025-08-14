import { NavLink } from "react-router";
import Header from "./Header";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Header />
      <div className="navbar-container">
        <ul className="navbar-links">
          <li><NavLink to="/" className="navbar-link ">Home</NavLink></li>
          <li><NavLink to="/shop" className="navbar-link">Shop</NavLink></li>
          <li><NavLink to="/about" className="navbar-link">About</NavLink></li>
          <li><NavLink to="/contact" className="navbar-link">Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
