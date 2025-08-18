import { useEffect, useState } from "react";
import { supabase } from "../../supabasae/createclient";
import { useCart } from "../../hooks/useCart";
import { useSetOrderMutation } from "../../api/orderApi";
import toast from "react-hot-toast";
import "./checkout.css";
import { useDeleteUserCartMutation } from "../../api/cartApi";
import { useNavigate } from "react-router";

export default function CheckOut() {
  const [shipping, setShipping] = useState("Standard");
  const [payment, setPayment] = useState("Credit Card");
  const [userID, setUserID] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(false);

  const [setOrder, { isError }] = useSetOrderMutation();
  const [deleteUserCart] = useDeleteUserCartMutation();
  const navigate = useNavigate()

  useEffect(() => {
    const setIdUser = async () => {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (session?.user?.id) setUserID(session.user.id);
    };
    setIdUser();
  }, []);

  const { cartItems } = useCart(userID);
  let subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
  const shippingCost = shipping === "Express" ? 14.99 : 4.99;
  const discount = subtotal * 0.2;
  const total = subtotal + shippingCost - discount;

  useEffect(() => setPrice(total), [total]);

  const handelSetOrder = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !address.trim() || !phone.trim() || !email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!userID) {
      toast.error("User is not logged in");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      const orderItems = cartItems.map(item => ({
        product_id: item.products.id,
        title: item.products.title,
        price: item.products.price,
        quantity: item.quantity,
        image: item.products.images[0]
      }));

      await setOrder({
        user_id: userID,
        fullName,
        phone,
        address,
        email,
        price: price.toFixed(2),
        products: orderItems
      }).unwrap();

      isError ? toast.error('Order failed!') : toast.success('Order placed successfully!');
      await deleteUserCart(userID).unwrap();
      navigate('/')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">

        {/* ================= Left Side ================= */}
        <div className="checkout-left">
          <h2 className="checkout-title">Shipping Information</h2>
          <form className="checkout-form" onSubmit={handelSetOrder}>
            <input required type="text" placeholder="Full name" className="checkout-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input required type="text" placeholder="Street address" className="checkout-input" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input required type="text" placeholder="Phone Number" className="checkout-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div className="checkout-grid-2">
              <input type="text" placeholder="Zip Code" className="checkout-input" />
              <input type="text" placeholder="City" className="checkout-input" />
            </div>
            <input required type="email" placeholder="Email address" className="checkout-input" value={email} onChange={(e) => setEmail(e.target.value)} />

            {/* Shipping Method */}
            <div>
              <h3 className="checkout-section-title">Shipping Method</h3>
              <label className="checkout-radio-label">
                <input type="radio" name="shipping" checked={shipping === "Express"} onChange={() => setShipping("Express")} />
                Express $14.99 (Dispatched in 24h)
              </label>
              <label className="checkout-radio-label">
                <input type="radio" name="shipping" checked={shipping === "Standard"} onChange={() => setShipping("Standard")} />
                Standard $4.99 (Dispatched in 1-2 days)
              </label>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="checkout-section-title">Payment Information</h3>
              <label className="checkout-radio-label">
                <input type="radio" name="payment" checked={payment === "Credit Card"} onChange={() => setPayment("Credit Card")} />
                Credit Card
              </label>
              <label className="checkout-radio-label">
                <input type="radio" name="payment" checked={payment === "PayPal"} onChange={() => setPayment("PayPal")} />
                PayPal
              </label>

              {payment === "Credit Card" && (
                <div className="checkout-credit-inputs">
                  <input type="text" placeholder="Card number" className="checkout-input" />
                  <input type="text" placeholder="Name on card" className="checkout-input" />
                  <div className="checkout-grid-2">
                    <input type="text" placeholder="Expiry date" className="checkout-input" />
                    <input type="text" placeholder="CVV" className="checkout-input" />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* ================= Right Side ================= */}
        <div className="checkout-summary">
          <h2 className="checkout-summary-title">Order Summary</h2>

          <div className="checkout-products">
            {cartItems.map((p) => (
              <div key={p.id} className="checkout-product-item">
                <div className="checkout-product-info">
                  <img src={p.products.images[0]} alt={p.products.title} className="checkout-product-img" />
                  <div><p>{p.products.title}</p></div>
                </div>
                <p>${(p.products.price * p.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="checkout-summary-details">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping cost</span><span>${shippingCost.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Discount (20%)</span><span>-${discount.toFixed(2)}</span></div>
          </div>

          <div className="checkout-total">
            <span>Order Total</span>
            <span>${price?.toFixed(2)}</span>
          </div>

          <button type="submit" className="checkout-button" onClick={handelSetOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
