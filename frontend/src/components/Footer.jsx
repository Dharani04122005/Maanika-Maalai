
import {
  FiInstagram,
  FiFacebook,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiHeart,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-[#3F1728] text-[#FAF4EE]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-serif text-[#E6C88E] mb-4">
              Maanikamaalai
            </h2>

            <p className="text-[#E7D5D0] text-sm leading-7 mb-6">
              Creating beautiful floral memories through
              traditional craftsmanship, creativity and love.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#C9A66B]/50
                flex items-center justify-center hover:bg-[#C49A35]
                hover:text-white transition-all duration-300"
              >
                <FiInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#C9A66B]/50
                flex items-center justify-center hover:bg-[#C49A35]
                hover:text-white transition-all duration-300"
              >
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#E6C88E] font-serif text-xl mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-[#E7D5D0]">
              <li><a href="/" className="hover:text-[#E6C88E] transition">Home</a></li>
              <li><a href="#collections" className="hover:text-[#E6C88E] transition">Collections</a></li>
              <li><a href="#contact" className="hover:text-[#E6C88E] transition">Contact Us</a></li>
              <li><a href="#reviews" className="hover:text-[#E6C88E] transition">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-[#E6C88E] font-serif text-xl mb-6">
              Our Collections
            </h3>

            <ul className="space-y-4 text-sm text-[#E7D5D0]">
              <li>Temple Collection</li>
              <li>Wedding Collection</li>
              <li>Stage Decorations</li>
              <li>Floral Jewellery</li>
              <li>Carpet Models</li>
              <li>Wall Hangings</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#E6C88E] font-serif text-xl mb-6">
              Get In Touch
            </h3>

            <ul className="space-y-5 text-sm text-[#E7D5D0]">

              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#E6C88E] mt-1 shrink-0" />
                <span>Thovalai, Kanyakumari District, Tamil Nadu</span>
              </li>

              <li className="flex items-center gap-3">
                <FiPhone className="text-[#E6C88E] shrink-0" />
                <span>Contact Number</span>
              </li>

              <li className="flex items-center gap-3">
                <FiMail className="text-[#E6C88E] shrink-0" />
                <span>Email Address</span>
              </li>

            </ul>
          </div>

        </div>

        {/* Decorative Divider */}
        <div className="border-t border-[#C9A66B]/30 my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between
          items-center gap-4 text-center">

          <p className="text-xs text-[#D9C2B8]">
            © {new Date().getFullYear()} Maanikamaalai. All Rights Reserved.
          </p>

          <p className="text-sm text-[#E6C88E] flex items-center gap-2">
            Crafted with <FiHeart className="text-red-300" /> and tradition.
          </p>

          <a
            href="#"
            className="text-xs text-[#D9C2B8] hover:text-[#E6C88E]
            transition flex items-center gap-1"
          >
            Back to Top <FiArrowUpRight />
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
