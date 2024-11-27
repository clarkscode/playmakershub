import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../database/supabase";

const AuthenticatedHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Logout from supabase
    localStorage.removeItem("authToken"); // Remove auth token
    navigate("/member/login"); // Redirect to login page
  };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="flex items-center justify-between p-4 shadow-md py-1 relative">
      <nav className="flex justify-center space-x-20 w-full">
        <button
          onClick={() => navigate("/events")}
          className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
        >
          Events
        </button>
        <button
          onClick={() => navigate("/playmakershub")}
          className="text-[#FFFFFF] text-4xl font-medium hover:text-[#a83c70]"
        >
          Playmakers Hub
        </button>
        <button
          onClick={() => navigate("")}
          className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
        >
          Home
        </button>
      </nav>

      {/* Profile section */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden relative z-10"
        >
          <img
            src="https://www.example.com/path/to/profile-image.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-md z-20"
            onClick={(e) => e.stopPropagation()} // Prevent dropdown closure when clicking inside
          >
            <div className="p-2">
              <p className="text-sm">Username: User123</p>
              <p className="text-sm">Email: user@example.com</p>
            </div>
            <div className="border-t border-gray-700">
              <button
                onClick={() => {
                  closeDropdown();
                  navigate("/profile");
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-700"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  closeDropdown();
                  handleLogout();
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={closeDropdown}
          ></div>
        )}
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
