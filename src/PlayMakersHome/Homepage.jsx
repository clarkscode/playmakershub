import React from 'react';
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
      <header className="flex items-center justify-between p-4 shadow-md py-1">
        {/* Replace "Homepage" with the Playmakers logo */}
        <img
          src="playmakerslogo.png"
          alt="Playmakers Logo"
          className="w-16 h-14 object-contain" // Adjust the size as needed
        />
        
        <nav className="flex justify-center space-x-20 w-full">
          <button
            onClick={() => navigate("/events")}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]">
            Events
          </button>
          <button
            onClick={() => navigate("/playmakers-hub")}
            className="text-[#FFFFFF] text-4xl font-medium hover:text-[#a83c70]">
            Playmakers Hub
          </button>
          <button
            onClick={() => navigate("")}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]">
            Home
          </button>
        </nav>
        
        <div>
          <button
            onClick={handleLogout}
            className="font-poppins px-6 py-2 bg-[#992d5e] text-[#ffffff] text-md font-bold hover:bg-[#a83c70] rounded-full"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="text-[#ffffff]">
        <div className="Content flex flex-col md:flex-row md:justify-between px-4 md:px-10">
          <div className="main-content -space-x-10">
            <img
              src="playmakerslogo.png"
              alt="Playmakers Logo"
              className="logo object-cover"
            />
            <div className="main-text-container">
              <div className="pr-20">
                <h1 className="main-text bottom-5 font-lexend font-semibold text-[#fcfafa]">
                  Exploring Music 
                  <br/>
                  Within You
                </h1> 
                <p className="sub-text text-[#7e7e7e] font-poppins mt-4 text-lg">
                  About us ➡
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
