import { FaFacebook, FaInstagram, FaRegUserCircle, FaWhatsapp } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./navbar.css";

const Header = () => {
    return (
        <section className="header">
            {/* social icons */}
            <div className="header-social">
                <FaInstagram size={20} />
                <FaFacebook size={20} />
                <FaWhatsapp size={20} />
            </div>

            {/* logo */}
            <div className="header-logo">
                <img src="logo.jpg" alt="logo" loading="lazy" />
            </div>

            {/* userIcon + shopIcon */}
            <div className="header-icons">
                <FaRegUserCircle size={20} />
                <MdOutlineShoppingCart size={20} />
            </div>
        </section>
    );
};

export default Header;
