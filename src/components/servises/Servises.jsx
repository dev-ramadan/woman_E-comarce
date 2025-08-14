import { motion } from "framer-motion";
import { BiSupport } from "react-icons/bi";
import { GiReturnArrow, GiWorld } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";

const Services = () => {
  const services = [
    { icon: <GiWorld size={45} />, title: 'Shipping Worldwide', description: 'Free shipping on all US orders or orders above' },
    { icon: <GiReturnArrow size={45} />, title: '14 Days Return', description: 'Simply return it within 30 days for an exchange.' },
    { icon: <MdOutlineSecurity size={45} />, title: 'Security Payment', description: 'We ensure secure payment with PEV' },
    { icon: <BiSupport size={45} />, title: '24/7 Support', description: 'Contact us 24 hours a day, 7 days a week' },
  ];

  return (
    <div className="overflow-hidden mt-10 border-b-2 border-b-gray-500 ">
      <div className="flex flex-col md:flex-wrap md:flex-row p-5 justify-around">
        {services.map((item, index) => (
          <motion.div
            key={item.title}
            className="flex flex-col sm:flex-row items-center sm:items-start p-5  rounded-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          >
            <div className="mb-4 sm:mb-0 sm:mr-4 text-center sm:text-left">
              {item.icon}
            </div>
            <div className="text-center sm:text-left  md:w-48">
              <h4 className="font-poppins text-sm mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
