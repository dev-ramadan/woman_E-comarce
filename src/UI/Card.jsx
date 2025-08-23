import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import "./ui.css";
import { useContext } from "react";
import { OureContext } from "../context/gloableContext";
import { useAddToCart } from "../utils/addTocart";

const Card = ({ title, price, image, id }) => {
  const {setQuantityDialog,setCurrentProductId} = useContext(OureContext);
  const {checkUser} = useAddToCart() ;

  const isLoginIn = ( id) => {
    checkUser()
    setCurrentProductId(id)
  }

  return (
    <div className="card">
      
      <div
        className="card-cart-icon"
        onClick={()=>isLoginIn(id)}
      >
        <MdOutlineShoppingCart size={20} />
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
