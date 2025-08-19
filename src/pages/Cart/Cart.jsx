import { useEffect, useState } from 'react';
import './cart.css'
import { useCart } from '../../hooks/useCart';
import { supabase } from '../../supabasae/createclient';
import { IoMdClose } from 'react-icons/io';
import { useDeleteItemMutation, useUpdateCartMutation } from '../../api/cartApi';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
const Cart = () => {
    const [userID, setUserID] = useState('');
    const [promoCode, setPromoCode] = useState(null);
    const [totaleAfterPromo, setTotaleAfterPromo] = useState(null)
    const { cartItems } = useCart(userID);
    const [deleteItem] = useDeleteItemMutation();
    const [updateCart] = useUpdateCartMutation()
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            const user = data.user;
            setUserID(user.id)
        }
        fetchUser()
    }, [])
    let totle = cartItems.reduce((sum, item) => {
        return sum + item.products.price * item.quantity

    }, 0)

    const chackPromoCode = () => {
        if (promoCode === 'dragon') {
            setTotaleAfterPromo(totle > 50 ? totle - 15 : totle - 5);
            toast.success('Discound Success')
        }
        return
    }
    return (
        <>
            <main className="cart_page">
                <div className="container">
                    <h1>Shopping Bag</h1>
                    <div className="content">
                        <div className="left_side_cart">
                            <div className="cart_title">
                                <h2>My shopping bag <span id="cart_counts">({cartItems.length})</span></h2>
                            </div>
                            <div className="cart_products">
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
                                                        <button className="mr-2" onClick={() => updateCart({ id: item.id, quantity: item.quantity <= 1 ? 1 : item.quantity - 1 })}>-</button>
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
                            </div>
                        </div>
                        <div className="right_side_cart">
                            <div className="Promotional_code">
                                <h2>
                                    Do you have a Promotional Code?
                                </h2>
                                <div className="apply_code">
                                    <input type="text" id="code" placeholder="Promo code" value={promoCode || ''} onChange={(e) => setPromoCode(e.target.value)} />
                                    <button onClick={chackPromoCode}>Done</button>
                                </div>
                            </div>
                            <div className="summary">
                                <h2>Order Summary</h2>
                                <div className="summary_price">
                                    <div>
                                        <h4>Subtotal</h4>
                                        <span id="Subtotal">${totle}</span>
                                    </div>
                                    <div>
                                        <h4>Total Order</h4>
                                        <span id="total_order " className={`${promoCode ? 'line-through' : ''}`}>${totle}</span>
                                        {promoCode ? <span id="total_order ">${totaleAfterPromo}</span> : ''}
                                    </div>
                                </div>
                                <Link to={`/checkout?total=${totaleAfterPromo}`} >
                                    <button className="checkout">Check Out</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Cart