import { FaArrowRight } from "react-icons/fa";
import "./Collection.css";

const Collection = () => {
  const images = [
    {
      image: "images/banner/banner1.webp",
      title: "Summer Collection",
      descripation: "Summer Collection",
      cta: "Discover Now",
    },
    {
      image: "images/banner/banner2.webp",
      title: "What’s New?",
      descripation: "Get the glow",
      cta: "Discover Now",
    },
    {
      image: "images/banner/banner3.webp",
      title: "Buy 1 Get 1",
      descripation: "Starting at $7.99",
      cta: "Shop Now",
    },
  ];

  return (
    <div className="collection-container">
      {images.map((img, index) => (
        <div key={index} className="collection-item group">
          <div className="shine-effect "></div>

          <div className="collection-text ">
            <h1>{img.title}</h1>
            <p>{img.descripation}</p>
          </div>

          <img src={img.image} alt={`banner-${index}`} className="collection-image" />

          <div className="cta">
            <span>{img.cta}</span>
            <FaArrowRight />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;
