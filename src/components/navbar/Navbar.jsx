import { NavLink } from "react-router";
import Header from "./Header";
import "./navbar.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const {profile} = useSelector(state => state.auth);
  const isAdmin = profile?.role;
  
  return (
    <nav className="navbar">
      <Header />
      <div className="navbar-container">
        <ul className="navbar-links">
          <li><NavLink to="/" className="navbar-link ">Home</NavLink></li>
          <li><NavLink to="/shop" className="navbar-link">Shop</NavLink></li>
          <li><NavLink to="/about" className="navbar-link">About</NavLink></li>
          <li><NavLink to="/contact" className="navbar-link">Contact</NavLink></li>
          {
            isAdmin === 'admin' ? <li><NavLink to="/dashboard" className=" bg-gray-200 p-2 rounded-2xl">Admin Panle</NavLink></li> : ''
          }
          
        </ul>
      </div>
    </nav>
  );
}
