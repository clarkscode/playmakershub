import React from 'react'
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
    window.location.reload();
  };

  return (
  <div className='bg-Radial bg-[#000000] h-screen'>
        <header className="flex items-center justify-between p-4 shadow-md">
          <h1 className="text-xl font-bold text-[#FFFFFF]">Homepage</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="font-poppins px-6 py-2 bg-[#992d5e] text-[#ffffff] text-md font-bold hover:bg-[#a83c70] rounded-full"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="text-[#ffffff]">
          Content
        </main>
  </div>
  )
}

export default Homepage