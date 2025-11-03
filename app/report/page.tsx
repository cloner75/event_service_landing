function Page() {
    return ( <div>
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-3xl font-bold">Report a Problem</h1>

        <div className="my-1 border-gray-200"></div>

        <section>
          <p className="text-gray-600 mb-2">
            Notice something not working right? Let us know what happened so our team can fix it as soon as possible.
          </p>

          <form className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Info@Dopin Experience Live in SF"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Fest@Dopin Experience Live in SF"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Google"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option>Wrong Information</option>
                  <option>Account Support</option>
                  <option>Business Inquiry</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option>Financial</option>
                  <option>Technical</option>
                  <option>Partnership</option>
                  <option>General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Type your message — we’ll get back soon!"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 w-[238px] ml-auto text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </div> );
}

export default Page;