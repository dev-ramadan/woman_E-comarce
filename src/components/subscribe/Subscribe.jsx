import "./subscribe.css";

export default function Subscribe() {
  return (
    <section className="subscribe-section">
      <div className="subscribe-container">
        <h2 className="subscribe-title">Subscribe to our newsletter</h2>
        <p className="subscribe-text">Get updates about new products and special offers</p>
        <form className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />
          <button className="subscribe-button">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
