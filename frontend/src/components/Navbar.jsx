
import { Link } from "react-router-dom";
import logo from "../assets/logo/vs-removebg-preview.png";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#faeefa] border-b border-[#E7D3A5]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-3">

          {/* Brand Logo */}
          <img
            src={logo}
            alt="VS Maanikamaalai Logo"
            className="w-14 h-14 object-contain"
          />

          {/* Brand Name */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[#7A1F3D] tracking-wide">
              MAANIKAMAALAI DECORS
            </h3>

            <span className="text-xs text-[#C9A227] tracking-[3px] uppercase">
              Traditional Floral Heritage
            </span>
          </div>

        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-3 text-[16px] font-medium">

          <Link
            to="/"
            className="px-5 py-2 rounded-full text-[#3B2A24] hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="px-5 py-2 rounded-full text-[#3B2A24] hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="px-5 py-2 rounded-full text-[#3B2A24] hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="px-5 py-2 rounded-full text-[#3B2A24] hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
          >
            Contact
          </Link>

        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5 text-2xl text-[#7A1F3D]">

          <FiSearch className="cursor-pointer hover:text-[#C9A227] hover:scale-110 transition-all duration-300" />

          <FiHeart className="cursor-pointer hover:text-[#C9A227] hover:scale-110 transition-all duration-300" />

          <FiShoppingCart className="cursor-pointer hover:text-[#C9A227] hover:scale-110 transition-all duration-300" />

          <Link to="/login">
            <FiUser className="cursor-pointer hover:text-[#C9A227] hover:scale-110 transition-all duration-300" />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
