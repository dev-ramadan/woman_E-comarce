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
import { useCart } from "../../hooks/useCart";

const Header = () => {
    const { openCartDrawer, setOpenCartDrawer } = useContext(OureContext);
    const { isLogin } = useSelector(state => state.auth);
    const [login, setLogin] = useState(false);
    const [userID, setUserID] = useState(null)
    const { cartItems } = useCart(userID)
    const dispatch = useDispatch();
    const handelLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout())
    }
    useEffect(() => {
        const setIdUser = async () => {
            const { data: { session } = {} } = await supabase.auth.getSession();
            if (session?.user?.id) setUserID(session.user.id);
        }
        setIdUser();
    }, []);
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
                        <div className="relative" onClick={() => setOpenCartDrawer(!openCartDrawer)}>
                            <h2 className="w-6 h-6 cursor-pointer text-white flex justify-center items-center absolute -top-5 -right-2 bg-blue-400 p-2 rounded-full">{cartItems.length || 0}</h2>
                            <MdOutlineShoppingCart className="cursor-pointer mr-2" size={25} />
                        </div>
                        <div>
                            <LiaSignOutAltSolid className="ml-2" size={25} onClick={handelLogout} />
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default Header;
