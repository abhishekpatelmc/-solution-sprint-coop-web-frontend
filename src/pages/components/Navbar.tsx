import React from "react";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className="flex h-16 items-center justify-center space-x-20 border-b-2 border-gray-100 text-lg text-gray-700 shadow-sm">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
