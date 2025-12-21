"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Page() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    setSuccess(false);

    try {
      await axios.post("/v1/contact-us/client", data);
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-3xl font-bold mb-8">Contact With Us</h1>

        {/* --- contact details stays the same --- */}

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-1">📩 General Contact</h2>
            <p className="text-gray-600">
              <span className="font-medium">hello@dopin.io</span> — General
              inquiries and feedback
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">🛠️ Support</h2>
            <ul className="space-y-1 text-gray-600">
              <li>
                <span className="font-medium">support@dopin.io</span> — User
                help, app or account issues
              </li>
              <li>
                <span className="font-medium">report@dopin.io</span> — Reporting
                problems, bugs, or policy violations
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📰 Press & Media</h2>
            <p className="text-gray-600">
              <span className="font-medium">press@dopin.io</span> — Media
              requests, interviews, or coverage
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">🤝 Partnerships</h2>
            <p className="text-gray-600">
              <span className="font-medium">partnerships@dopin.io</span> —
              Business collaborations, event partnerships, or sponsorships
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">💼 Careers & Hiring</h2>
            <p className="text-gray-600">
              <span className="font-medium">jobs@dopin.io</span> — Employment
              and internship opportunities
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">⚖️ Legal</h2>
            <p className="text-gray-600">
              <span className="font-medium">legal@dopin.io</span> — Privacy,
              copyright, and terms-related communications
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">
              💡 Product & Feedback
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">feedback@dopin.io</span> —
              Suggestions for new features or improvements
            </p>
          </div>
        </section>

        <div className="my-12"></div>

        {/* SEND MESSAGE SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <p className="text-gray-600 mb-8">
            Have a question, idea, or issue? We’d love to hear from you! Send us
            a message and our team will get back to you as soon as possible.
          </p>

          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name ..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name ..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                {...register("company_name")}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                {...register("company_name")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option>Wrong Information</option>
                  <option>Account Support</option>
                  <option>Business Inquiry</option>
                  <option>Press & Media</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register("department", {
                    required: "Department is required",
                  })}
                >
                  <option>Financial</option>
                  <option>Technical</option>
                  <option>Partnership</option>
                  <option>General</option>
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Type your message — we’ll get back soon!"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                {...register("message", {
                  required: "Message is required",
                })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* SERVER ERROR */}
            {serverError && (
              <p className="text-red-600 text-sm">{serverError}</p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="text-green-600 text-sm">
                Your message has been sent successfully!
              </p>
            )}

            <button
              type="submit"
              className="bg-indigo-600 w-[238px] text-white ml-auto font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Page;
