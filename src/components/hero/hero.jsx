import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import "./hero.css";
import { Link } from "react-router";
import { useGetSectionByTypeQuery } from "../../api/sectionApi";

const HeroSlider = () => {
  const NextArrow = ({ onClick }) => (
    <div className="next-arrow" onClick={onClick}>
      <FaArrowRight className="icon" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="prev-arrow" onClick={onClick}>
      <FaArrowLeft className="icon" />
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
        <ul className="dots">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="dot"></div>,
  };
  const { data: slides, isLoading } = useGetSectionByTypeQuery("hero")

  isLoading ? <p>LOADING..</p> : ''
  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides?.map((slide, index) => (
          <div key={index} className="slide">
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.image_url})` }}
            ></div>

            <motion.div
              className="slide-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="title">{slide.title}</h1>
              <h2 className="subtitle">{slide.subtitle}</h2>
              <motion.button
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={'/shop'}>
                  {slide.button_text}
                </Link>
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
