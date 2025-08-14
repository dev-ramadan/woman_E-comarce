import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSlider = () => {
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-3 md:right-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 md:p-3 cursor-pointer z-30 hover:bg-gray-200 transition"
      onClick={onClick}
    >
      <FaArrowRight className="text-black text-sm md:text-lg" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 md:p-3 cursor-pointer z-30 hover:bg-gray-200 transition"
      onClick={onClick}
    >
      <FaArrowLeft className="text-black text-sm md:text-lg" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div>
        <ul className="flex justify-center gap-2 md:gap-3 mt-2 md:mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-400 rounded-full hover:bg-black"></div>
    )
  };

  const slides = [
    {
      img: "src/assets/images/hero/hero001.webp",
      title: "Get up to 30%",
      subtitle: "Off New Arrivals",
      button: "Shop Now",
    },
    {
      img: "src/assets/images/hero/hero002.webp",
      title: "Summer Collection",
      subtitle: "Hot & Trendy",
      button: "Shop Now",
    },
    {
      img: "src/assets/images/hero/hero003.webp",
      title: "Exclusive Deals",
      subtitle: "Grab Yours Today",
      button: "Shop Now",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[360px] md:h-[550px]">
            {/* الصورة كخلفية */}
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-contain md:bg-cover"
              style={{ backgroundImage: `url(${slide.img})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 md:bg-black md:bg-opacity-40"></div>

            {/* النص على الشمال */}
            <motion.div
              className="absolute left-4 md:left-10 top-1/3 md:top-1/2 transform -translate-y-1/2 z-20 text-gray-500 md:text-white max-w-xs md:max-w-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
                {slide.title}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-3xl mt-2 drop-shadow-lg">
                {slide.subtitle}
              </h2>
              <motion.button
                className="bg-white text-black px-4 py-2 sm:px-5 sm:py-3 mt-4 md:mt-6 hover:bg-gray-200 transition text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.button}
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
