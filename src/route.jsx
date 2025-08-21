import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Shop from "./pages/shop/Shop";
import ProductDetils from "./pages/ProductDetils/ProductDetils";
import Register from "./pages/account/register/Register";
import Login from "./pages/account/login/login";
import Cart from "./pages/Cart/Cart";
import DashboardLayout from "./pages/dashboard/dashbordLayout/DashbordLayout";
import DashbordProducts from "./pages/dashboard/pages/products";
import Orders from "./pages/dashboard/pages/order";
import Categories from "./pages/dashboard/pages/categories";
import CheckOut from "./pages/chackOut/CheckOut";
import ProfilePage from "./pages/profile/Proflie";

const route = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="/product/:id" element={<ProductDetils />} />
            <Route path="profile" element = {<ProfilePage/>}/>
        </Route>
            <Route path="signup" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<DashbordProducts/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="categories" element={<Categories/>}/>
            </Route>
    </>
))

export default route