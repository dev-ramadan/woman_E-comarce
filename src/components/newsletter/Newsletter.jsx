import { BsFillSendCheckFill } from "react-icons/bs";

const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* text */}
        <div>
          <h2 className="text-2xl font-semibold font-poppins">Newsletter</h2>
          <p className="text-gray-600 mt-2">
            Subscribe to our newsletter and get 20% off your first purchase
          </p>
        </div>

        {/* email form */}
        <form className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="px-4 py-2 border border-gray-300 focus:outline-none w-full md:w-72"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 flex items-center justify-center"
          >
            <BsFillSendCheckFill />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
