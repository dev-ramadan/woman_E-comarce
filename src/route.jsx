import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Shop from "./pages/shop/Shop";
import ProductDetils from "./pages/ProductDetils/ProductDetils";

const route = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="shop" element={<Shop/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="/product/:id" element={<ProductDetils/>}/>
    </Route>
    </>
))

export default route