import { FaTruck, FaGem, FaHeadset, FaDollarSign } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './about.css'
import { Link } from "react-router";
const About = () => {
  return (
    <div className="about_page">

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
          We are dedicated to providing the best products and services to our customers. Quality, trust, and satisfaction are our top priorities.
        </p>
      </section>

      {/* Features Section */}
      <section className="features py-16 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Why Choose Us</h2>
        <div className="features_grid">
          <div className="feature_card">
            <FaTruck className="feature_icon mx-auto mb-4 text-blue-500" />
            <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">We deliver your products quickly and safely to your doorstep.</p>
          </div>
          <div className="feature_card">
            <FaGem className="feature_icon mx-auto mb-4 text-purple-500" />
            <h4 className="text-xl font-semibold mb-2">Premium Quality</h4>
            <p className="text-gray-600 text-sm">All our products are of the highest quality standards.</p>
          </div>
          <div className="feature_card">
            <FaHeadset className="feature_icon mx-auto mb-4 text-green-500" />
            <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Our team is always ready to help you anytime, anywhere.</p>
          </div>
          <div className="feature_card">
            <FaDollarSign className="feature_icon mx-auto mb-4 text-yellow-500" />
            <h4 className="text-xl font-semibold mb-2">Best Prices</h4>
            <p className="text-gray-600 text-sm">We offer competitive prices without compromising quality.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">What Our Customers Say</h2>
        <div className="testimonials_grid">
          <div className="testimonial_card">
            <p className="text-gray-600 mb-4">"Excellent service and fast delivery. Highly recommend!"</p>
            <h4 className="font-semibold">- John Doe</h4>
          </div>
          <div className="testimonial_card">
            <p className="text-gray-600 mb-4">"High quality products at amazing prices."</p>
            <h4 className="font-semibold">- Jane Smith</h4>
          </div>
          <div className="testimonial_card">
            <p className="text-gray-600 mb-4">"Great support team and very reliable."</p>
            <h4 className="font-semibold">- Alex Johnson</h4>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact_cta py-16 px-6 text-center bg-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-6 max-w-2xl mx-auto">Have questions or need support? Contact us today!</p>
        <Link to={'/contact'}>
        <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2 mx-auto">
          <MdEmail size={24} /> Contact Us
        </button>
        </Link>
      </section>

    </div>
  );
};

export default About;
