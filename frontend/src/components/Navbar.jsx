
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/vs-removebg-preview.png";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const iconStyle =
    "cursor-pointer hover:text-[#C9A227] hover:scale-110 transition-all duration-300";

  return (
    <header className="sticky top-0 z-50 bg-[#faeefa] border-b border-[#E7D3A5]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">

        {/* Logo + Brand Name */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 sm:gap-3 min-w-0"
        >
          <img
            src={logo}
            alt="VS Maanikamaalai Logo"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain shrink-0"
          />

          <div className="flex flex-col min-w-0">
            <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-[#7A1F3D] tracking-wide whitespace-nowrap">
              MAANIKAMAALAI DECORS
            </h3>

            <span className="text-[8px] sm:text-[10px] md:text-xs text-[#C9A227] tracking-[1.5px] sm:tracking-[3px] uppercase">
              Traditional Floral Heritage
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3 text-[16px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-5 py-2 rounded-full text-[#3B2A24] hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5 text-2xl text-[#7A1F3D]">
          <FiSearch className={iconStyle} />
          <FiHeart className={iconStyle} />
          <FiShoppingCart className={iconStyle} />

          <Link to="/login">
            <FiUser className={iconStyle} />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3 text-xl text-[#7A1F3D] shrink-0">
          <Link to="/cart" aria-label="Shopping Cart">
            <FiShoppingCart className={iconStyle} />
          </Link>

          <Link to="/login" aria-label="Login">
            <FiUser className={iconStyle} />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-1"
          >
            {menuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[#E7D3A5] bg-[#faeefa] px-4 py-3 shadow-md">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-[#3B2A24] font-medium hover:bg-[#7A1F3D] hover:text-white transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}

    </header>
  );
}

export default Navbar;
