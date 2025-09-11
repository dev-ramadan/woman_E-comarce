
import { motion } from "framer-motion";
import "./services.css";
import { useGetSectionByTypeQuery } from "../../api/sectionApi";
import DynamicIcon from "../../utils/dynamicIcon";

const Services = () => {
    const {data : service} = useGetSectionByTypeQuery("service");
    
  return (

    <div className="services-wrapper">
      <div className="services-container">
        {service?.map((item,index) => (
          <motion.div
            key={item.title}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          >
            <div className="service-icon"><DynamicIcon name={item?.icon} size={45} className=""/></div>
            <div className="service-text">
              <h4 className="service-title">{item.title}</h4>
              <p className="service-description">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
