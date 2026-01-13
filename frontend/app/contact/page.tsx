export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-3">Contact Us</h1>
        <p className="text-gray-600">
          Have questions? We'd love to hear from you.
        </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> support@example.com</p>
          </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Left Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm border">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
