import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + النص */}
        <div className="footer-section">
          <img
            src="logo.jpg"
            alt="Logo"
            className="footer-logo"
          />
          <p className="footer-text">
            The customer is at the heart of our unique business model, which includes design.
          </p>
        </div>

        {/* Shopping */}
        <div>
          <h3 className="footer-title">SHOPPING</h3>
          <ul className="footer-list">
            <li>Clothing Store</li>
            <li>Trending Shoes</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="footer-title">Customer Services</h3>
          <ul className="footer-list">
            <li>Contact Us</li>
            <li>Payment Methods</li>
            <li>Delivery</li>
            <li>Return & Exchanges</li>
          </ul>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="footer-bottom">
        © 2024 All rights reserved. Made with <span className="heart">❤</span> by{" "}
        <span className="brand">Dragon Code</span>
      </div>
    </footer>
  );
};

export default Footer;
