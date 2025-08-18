import { BsFillSendCheckFill } from "react-icons/bs";
import './newsletter.css'

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        {/* النص */}
        <div>
          <h2 className="newsletter-title">Newsletter</h2>
          <p className="newsletter-text">
            Subscribe to our newsletter and get 20% off your first purchase
          </p>
        </div>

        {/* فورم البريد */}
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="newsletter-input"
          />
          <button
            type="submit"
            className="newsletter-button"
          >
            <BsFillSendCheckFill />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
