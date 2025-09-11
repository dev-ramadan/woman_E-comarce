import { FaArrowRight } from "react-icons/fa";
import "./Collection.css";
import { useGetSectionByTypeQuery } from "../../api/sectionApi";

const Collection = () => {
  const {data : collections} = useGetSectionByTypeQuery("collection");
  return (
    <div className="collection-container">
      {collections?.map((collection) => (
        <div key={collection.id} className="collection-item group">
          <div className="shine-effect "></div>

          <div className="collection-text ">
            <h1>{collection.title}</h1>
            <p>{collection.subtitle}</p>
          </div>

          <img src={collection.image_url} alt={`banner-${collection.id}`} className="collection-image" loading="lazy"/>

          <div className="cta">
            <span>{collection.button_text}</span>
            <FaArrowRight />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;
