export default function Subscribe() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p className="mb-6">Get updates about new products and special offers</p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
