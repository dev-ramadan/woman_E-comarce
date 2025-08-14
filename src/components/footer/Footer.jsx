const Footer = () => {
  return (
    <footer className="bg-white py-10 px-6 md:px-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + نص */}
        <div className="flex flex-col items-start">
          <img
            src="src/assets/images/logo.jpg"
            alt="Logo"
            className="w-16 mb-4"
          />
          <p className="text-gray-600 text-sm font-poppins">
            The customer is at the heart of our unique business model, which includes design.
          </p>
        </div>

        {/* Shopping */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-poppins">SHOPPING</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Clothing Store</li>
            <li>Trending Shoes</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-poppins">Customer Services</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Contact Us</li>
            <li>Payment Methods</li>
            <li>Delivery</li>
            <li>Return & Exchanges</li>
          </ul>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="text-center mt-10 text-gray-600 text-sm">
        © 2024 All rights reserved. Made with <span className="text-red-500">❤</span> by{" "}
        <span className="text-teal-500">Amira Alaa</span>
      </div>
    </footer>
  );
};

export default Footer;
