import { FaFacebook, FaInstagram, FaRegUserCircle, FaWhatsapp } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { OureContext } from "../../context/gloableContext";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { supabase } from "../../supabasae/createclient";
import { logout } from "../../Redux/authSlice";

const Header = () => {
    const { openCartDrawer, setOpenCartDrawer } = useContext(OureContext);
    const { isLogin } = useSelector(state => state.auth);
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch();
    const handelLogout = async() => {
       await supabase.auth.signOut();
       dispatch(logout())
    }
    useEffect(() => {
        setLogin(isLogin)
    }, [isLogin])

    return (
        <section className="header">
            {/* social icons */}
            <div className="header-social">
                <FaInstagram size={20} className="cursor-pointer" />
                <FaFacebook size={20} className="cursor-pointer" />
                <FaWhatsapp size={20} className="cursor-pointer" />
            </div>

            {/* logo */}
            <div className="header-logo">
                <img src="logo.jpg" alt="logo" loading="lazy" />
            </div>

            {/* userIcon + shopIcon */}
            {
                !login ? (
                    <div className="header-icons">
                        <Link to={'/signup'}>
                            <FaRegUserCircle className="cursor-pointer" size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="header-icons">
                        <MdOutlineShoppingCart className="cursor-pointer" size={20} onClick={() => setOpenCartDrawer(!openCartDrawer)} />
                        <LiaSignOutAltSolid size={23} onClick={handelLogout}/>
                    </div>
                )
            }
        </section>
    );
};

export default Header;
