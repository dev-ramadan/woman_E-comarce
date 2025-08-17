import { Outlet } from "react-router"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import CartDrawer from "../UI/CartDrawer"

const Layout = () => {
    return (
        <>
        <Navbar/>
        <CartDrawer/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default Layout