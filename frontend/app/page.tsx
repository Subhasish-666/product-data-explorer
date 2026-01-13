export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-indigo-900/30 to-black -z-10" />

      <div className="max-w-3xl mx-auto text-center py-32">

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Web Srapping
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-400 text-lg">
          This is a web scrapping site from World of Book, explore products from site.
        </p>
      </div>
    </div>
  )
}
