import { useContext } from "react";
import { NavLink } from "react-router";
import { OureContext } from "../../../context/gloableContext";
import { FaBox, FaTags, FaShoppingCart, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import '../pages/dashpoard.css';

const Sidebar = () => {
  const { asideAdmin, setAsideAdmin } = useContext(OureContext);

  return (
    <>
      {!asideAdmin && (
        <button
          onClick={() => setAsideAdmin(true)}
          className="toggle-btn"
        >
          <FaBars size={20} />
        </button>
      )}

      <div
        className={`sidebar-container ${asideAdmin ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="sidebar-header">
          <h1 className="sidebar-title">Dashboard</h1>
          <button onClick={() => setAsideAdmin(false)} className="sidebar-close-btn">
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="sidebar-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <FaBox /> Products
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <FaTags /> Categories
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <FaShoppingCart /> Orders
          </NavLink>
        </nav>
      </div>

      {asideAdmin && (
        <div
          className="overlay"
          onClick={() => setAsideAdmin(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
