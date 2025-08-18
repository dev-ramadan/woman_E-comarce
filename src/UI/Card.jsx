import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import { useAddToCart } from "../utils/addTocart";
import "./ui.css";

const Card = ({ title, price, image, id }) => {
  const handelAdd = useAddToCart();

  return (
    <div className="card">
      <div
        className="card-cart-icon"
        onClick={() => handelAdd(id)}
      >
        <MdOutlineShoppingCart size={20} />
      </div>
      <Link to={`/product/${id}`}>
        <div className="card-image-wrapper">
          <img
            src={image}
            alt={title}
            className="card-image"
          />
        </div>
      </Link>
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price}</p>
    </div>
  );
};

export default Card;
