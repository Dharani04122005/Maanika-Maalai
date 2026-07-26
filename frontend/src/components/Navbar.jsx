import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <h1 className="text-3xl font-bold text-emerald-700">
          🌸 Maanikamaalai
        </h1>

        <ul className="flex gap-8 text-gray-700 font-medium">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;