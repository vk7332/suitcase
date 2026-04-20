import React, { useState } from "react";

const ContactUsPage: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! Your message has been submitted.");
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                📩 Contact Us
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded h-32"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 text-gray-700">
                <p><strong>VK Tax & Law Chamber®</strong></p>
                <p>Email: support@suitcaselegal.com</p>
                <p>Website: www.suitcaselegal.com</p>
            </div>
        </div>
    );
};

export default ContactUsPage;


