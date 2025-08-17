import { useContext, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { OureContext } from "../context/gloableContext"
import { motion } from 'framer-motion';
import { useCart } from "../hooks/useCart";
import { supabase } from "../supabasae/createclient";
import './ui.css'
import { useDeleteItemMutation, useUpdateCartMutation } from "../api/cartApi";
import { Link } from "react-router";

const CartDrawer = () => {
    const { openCartDrawer, setOpenCartDrawer } = useContext(OureContext);
    const [userID, setUserID] = useState('');
    const [deleteItem] = useDeleteItemMutation();
    const [updateCart] = useUpdateCartMutation();

    useEffect(() => {
        const setIdUser = async () => {
            const { data: { session } = {} } = await supabase.auth.getSession();
            if (session?.user?.id) setUserID(session.user.id);
        }
        setIdUser();
    }, []);

    const { cartItems } = useCart(userID);
       let totle =  cartItems.reduce((sum, item) => {
            return sum + item.products.price * item.quantity

        }, 0)


    return (
        <>
            {openCartDrawer && (
                <section>
                    <motion.div
                        key="mobile-aside"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="motion"
                    >
                        <div className="flex justify-between p-10 font-medium items-center">
                            <h2>SHOPPING CART</h2>
                            <div className="bg-gray-300 rounded-full flex items-center justify-center p-1">
                                <IoMdClose
                                    className="cursor-pointer"
                                    size={25}
                                    onClick={() => setOpenCartDrawer(!openCartDrawer)}
                                />
                            </div>
                        </div>

                        {/*  */}
                        {
                            cartItems.map(item => (
                                <div key={item.id} className="cart_product">
                                    <div className="cart_product_img">
                                        <img src={item.products.images[0]} />
                                    </div>
                                    <div className="cart_product_info">
                                        <div className="top_card">
                                            <div className="left_card">
                                                <h4 className="product_name">${item.products.title}</h4>
                                                <span className="product_price">${item.products.price}</span>
                                            </div>
                                            <div className="remove_product">
                                                <IoMdClose onClick={() => deleteItem(item.id)} />
                                            </div>
                                        </div>
                                        <div className="buttom_card">
                                            <div className="counts">
                                                <button className="mr-2" onClick={() => updateCart({ id: item.id, quantity: item.quantity <= 1 ? '' : item.quantity - 1 })}>-</button>
                                                <input type="number" readOnly min="1" step="1" max="999"
                                                    value={item.quantity} className="product_count" />
                                                <button onClick={() => updateCart({ id: item.id, quantity: item.quantity + 1 })}>+</button>
                                            </div>
                                            <span className="total_price">$${item.quantity * item.products.price}.00</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="cart_total">
                            <h3>Total:</h3>
                            <span id="total_price">${totle}</span>
                        </div>
                        {cartItems.length >= 1 ? (
                            <div className="btn_control">
                                <Link to={'/cart'}>
                                <button className="viewCart">View Cart</button>
                                </Link>
                                <button className="checkout">Check Out</button>
                            </div>
                        ) : <div className="cart_empty">Cart is Empaty</div>}
                        {/*  */}
                    </motion.div>
                </section>
            )}
        </>
    )
}

export default CartDrawer;
