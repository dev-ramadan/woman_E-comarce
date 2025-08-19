import { Outlet } from "react-router"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import CartDrawer from "../UI/CartDrawer"
import SelectQuantity from "../UI/SelectQuantityModal"

const Layout = () => {
    return (
        <>
        <Navbar/>
        <SelectQuantity />
        <CartDrawer/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default Layout