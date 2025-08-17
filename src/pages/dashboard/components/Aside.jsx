import { NavLink } from "react-router";

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-800 text-white p-5">
    <h1 className="text-xl font-bold mb-6">Dashboard</h1>
    <nav className="flex flex-col gap-4">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
      >
        Products
      </NavLink>
      <NavLink
        to="/dashboard/categories" 
        className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
      >
        Categories
      </NavLink>
      <NavLink 
        to="/dashboard/orders" 
        className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
      >
        Orders
      </NavLink>
      <NavLink 
        to="/dashboard/users" 
        className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
      >
        Users
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;
