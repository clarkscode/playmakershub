import React from 'react'
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
    window.location.reload();
  };

  return (<header className="flex items-center justify-between p-4 shadow-md">
    <h1 className="text-xl font-bold text-[#FFFFFF]">Homepage</h1>
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[#FFFFFF] text-black rounded hover:bg-[#9e9c9d]"
      >
        Logout
      </button>
    </div>
  </header>
  )
}

export default Homepage