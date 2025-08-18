import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import './contact.css'
const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="contact_page">

            {/* Hero */}
            <section className="hero bg-gray-100 py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
                    Have questions or need help? Fill out the form below and we'll get back to you as soon as possible.
                </p>
            </section>

            {/* Contact Info */}
            <section className="info_section py-16 px-6">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Get in Touch</h2>
                <div className="info_grid grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="info_card p-6 bg-white rounded-lg shadow-md">
                        <MdEmail className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Email</h4>
                        <p className="text-gray-600">support@yourwebsite.com</p>
                    </div>
                    <div className="info_card p-6 bg-white rounded-lg shadow-md">
                        <MdPhone className="text-4xl text-green-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Phone</h4>
                        <p className="text-gray-600">+1 234 567 890</p>
                    </div>
                    <div className="info_card p-6 bg-white rounded-lg shadow-md">
                        <MdLocationOn className="text-4xl text-red-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Location</h4>
                        <p className="text-gray-600">123 Main Street, City, Country</p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="form_section py-16 px-6 bg-gray-50">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Send a Message</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                    {submitted && (
                        <p className="text-green-600 text-center mt-2">Your message has been sent!</p>
                    )}
                </form>
            </section>


            {/* Map Section */}
            <section className="map_section py-16 px-6">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Our Location</h2>
                <div className="map_container w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086764345956!2d-122.41941508468193!3d37.77492977975956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c0f1f1f1f%3A0x1b2c3d4e5f6g7h8i!2sYour%20Company%20Address!5e0!3m2!1sen!2sus!4v1692368956953!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Company Location"
                    ></iframe>
                </div>
            </section>

        </div>
    );
};

export default Contact;
