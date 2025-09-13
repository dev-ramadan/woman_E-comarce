import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import "./ui.css";
import { useContext, useState } from "react";
import { OureContext } from "../context/gloableContext";
import { useAddToCart } from "../utils/addTocart";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";

const Card = ({ title, price, image, id }) => {
  const { selectQuantity, setSelectQuantity } = useContext(OureContext);
  const { user } = useSelector(state => state.auth)
  const [add, setAdd] = useState(false)
  const { checkUser, handelAdd } = useAddToCart();

  const fristClick = () => {
    if (!user) {
      checkUser();
       return;
    } 
    if(!add){
      setAdd(true)
    }
  }
  const scoundClick = () => {
    setAdd(false)
    handelAdd(id)
  }

  const addToCart = () => {
    if (add && user) {
      scoundClick();
      return;
    }
    fristClick()
  }

  return (
    <div className="card shadow-xl p-2 rounded-lg">

      <div
        className="card-cart-icon"
        onClick={addToCart}

      // onClick={() => isLoginIn(id)}
      >
        <MdOutlineShoppingCart size={20} className="shop" />
        <div className={`w-20 ${add ? 'flex' : 'hidden'}   items-center justify-center relative px-5 rounded-md shadow-lg bg-white h-fit`}>
          <button className="absolute right-1" onClick={(e) => { e.stopPropagation(); setSelectQuantity(prev => prev + 1) }}>+</button>
          <input type="text" value={selectQuantity} onChange={(e) => setSelectQuantity(Number(e.target.value))} className="text-center w-full border-none outline-none" />
          <button className="absolute left-1" onClick={(e) => { e.stopPropagation(); setSelectQuantity(prev => Math.max(prev - 1, 1)) }}>-</button>
        </div>

      </div>


      <Link to={`/product/${id}`}>
        <div className="card-image-wrapper">
          <img
            src={image}
            alt={title}
            className="card-image"
            loading="lazy"
          />
        </div>
      </Link>
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price}</p>
    </div>
  );
};

export default Card;
