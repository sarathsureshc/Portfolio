import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { createContact, resetSuccess } from "../slices/contactSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.contacts);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (data) => {
    dispatch(createContact(data)).then(() => {
      reset();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetSuccess());
      }, 5000);
    });
  };

  return (
    <>
      <Meta title="Contact | Sarath Suresh C - MERN Stack Developer" />
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a question or want to work together? Feel free to reach out
              to me using the contact form below or through my contact
              information.
            </p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Me a Message
                </h2>

                {showSuccessMessage && (
                  <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 dark:bg-green-900 dark:text-green-100 dark:border-green-700"
                    role="alert"
                  >
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">
                      Your message has been sent successfully. I'll get back to
                      you soon.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`form-input ${
                        errors.name ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-input ${
                        errors.email ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`form-input ${
                        errors.subject
                          ? "border-red-500 dark:border-red-500"
                          : ""
                      }`}
                      placeholder="Project Inquiry"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`form-textarea ${
                        errors.message
                          ? "border-red-500 dark:border-red-500"
                          : ""
                      }`}
                      placeholder="Your message here..."
                      {...register("message", {
                        required: "Message is required",
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Contact Information
                </h2>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-sm">
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Email
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          <a
                            href="mailto:your.email@example.com"
                            className="hover:text-blue-500 transition-colors"
                          >
                            sarathnandu1983@gmail.com
                          </a>
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Email me for general inquiries
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
                          <Phone className="h-6 w-6 text-green-600 dark:text-green-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Phone
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          <a
                            href="tel:+1234567890"
                            className="hover:text-blue-500 transition-colors"
                          >
                            +91 9544796346
                          </a>
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Mon-Fri from 9am to 5pm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                          <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Location
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Malappuram, Kerala, India
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Available for remote work worldwide
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-12">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Follow Me
                    </h3>
                    <div className="flex space-x-6">
                      <a
                        href="https://github.com/sarathsureshc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <span className="sr-only">GitHub</span>
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sarath-suresh-c/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com/23_cyanid3_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
