import heroImage from "../assets/images/hero/hero.jpeg";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-rose-50 to-emerald-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}

        <div>

          <p className="text-pink-600 font-semibold text-lg">
            🌸 Welcome to Maanikamaalai
          </p>

          <h1 className="text-5xl font-bold text-emerald-800 mt-4 leading-tight">
            Traditional Flower Art
            <br />
            Handcrafted with Love
          </h1>

          <p className="mt-6 text-gray-700 text-lg">
            Premium flower garlands, temple decorations,
            wedding floral designs and handcrafted floral art
            made with tradition and elegance.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="bg-emerald-700 text-white px-6 py-3 rounded-xl hover:bg-emerald-800 transition">
              Shop Now
            </button>

            <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-xl hover:bg-pink-600 hover:text-white transition">
              Book Decoration
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

          <img
            src={heroImage}
            alt="Traditional Flower Decoration"
            className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;