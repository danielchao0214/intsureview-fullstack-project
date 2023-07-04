import React, { useState } from "react";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-[#e3e0de]">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-text font-nunitosans">FormApp</h1>
      </div>
      <div>
        <button
          className="px-4 py-2 font-bold transition duration-500 rounded shadow-sm bg-secondary-button hover:drop-shadow-xl hover:bg-secondary-button-hover"
          onClick={toggleDropdown}
          aria-expanded={showDropdown}
          aria-haspopup="true"
        >
          DC
        </button>
        {showDropdown && (
          <div
            className="absolute mt-2 border border-gray-300 rounded shadow-md right-6 bg-background"
            role="menu"
            aria-labelledby="dropdownButton"
          >
            <ul className="">
              <li
                className="px-4 py-2 hover:bg-gray-200"
                role="menuitem"
                tabIndex={0}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200"
                role="menuitem"
                tabIndex={0}
              >
                Settings
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
