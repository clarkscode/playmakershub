import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  

  return (
    <div className="bg-Radial h-screen bg-[#000000] ">
      <header className="flex items-center justify-between p-4 shadow-md py-1">
        <nav className="flex justify-center space-x-20 w-full">
          <button
            onClick={() => navigate("/events")}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
          >
            Events
          </button>

          <button
            onClick={() => navigate("/events")}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/playmakers-hub")}
            className="text-[#FFFFFF] text-4xl font-medium hover:text-[#a83c70]"
          >
            Playmakers Hub
          </button>

          <button
            onClick={togglePopup}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
          >
            Booking
          </button>

          <button
            onClick={() => navigate("")}
            className="text-[#FFFFFF] text-2xl font-medium hover:text-[#a83c70]"
          >
            Join us
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLoginClick}
            className="font-poppins px-6 py-2 bg-[#992d5e] text-[#ffffff] text-md font-bold hover:bg-[#a83c70] rounded-full"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex justify-center items-center">
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
                  <br />
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

      {/* Pop-up form */}
      {popupVisible && (
        <div className="fixed inset-0 bg-grey bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg">
          <div className="bg-[#36303C] p-8 rounded-lg shadow-lg w-2/4 h-4/5 overflow-y-scroll ">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl text-white mb-4">
            Book Event 
            <span>
              <a href="#" className="bg-[#b70039] text-white py-1 px-2 ml-96 rounded-md ">Previous Booking</a>
            </span>
          </p>
     
            </div>
            <form>
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm text-gray-400">Title</label>
          <input
            type="text"
            name="title"
            className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
            placeholder="Event Title"
         
          />
        </div>

        {/* Start Date and End Date */}
        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="startDate" className="block text-sm text-gray-400">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
            
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="endDate" className="block text-sm text-gray-400">End Date</label>
            <input
              type="date"
              name="endDate"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
         
            />
          </div>
        </div>

        {/* Fullname */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm text-gray-400">Fullname</label>
          <input
            type="text"
            name="fullname"
            className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500 "
            placeholder="Fullname"
          
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
            placeholder="Email"
         
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm text-gray-400">Location</label>
          <input
            type="text"
            name="location"
            className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
            placeholder="Event Location"
           
          />
        </div>

        {/* Department/Organization */}
        <div className="flex justify-between mb-4">
          <div className="w-[35%]">
            <select
              name="eventType"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
           
            >
              <option value="Department">Department</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
          <div className="w-[60%]">
            <input
              type="text"
              name="eventTypeName"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
              placeholder="Department/Organization Name"
          
            />
          </div>
        </div>

        {/* Genre/Theme */}
        <p className="text-sm text-gray-400 mb-4">
          Genre: e.g Rock, Pop Music, Classical Music. 
          <br />
          Theme: e.g Unveil the Secrets, Throwback Friday.
        </p>

        <div className="flex justify-between mb-4">
          <div className="w-[35%]">
            <select
              name="genre"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
        
            >
              <option value="Genre">Genre</option>
              <option value="Theme">Theme</option>
            </select>
          </div>
          <div className="w-[60%]">
            <input
              type="text"
              name="genreTheme"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
              placeholder="Genre/Theme"
           
            />
          </div>
        </div>

        {/* Number of Musicians */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="w-[30%]">
            <label className="block text-sm text-gray-400">No. of Guitarists</label>
            <input
              type="number"
              name="guitarist"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
    
            />
          </div>
          <div className="w-[30%]">
            <label className="block text-sm text-gray-400">No. of Vocalists</label>
            <input
              type="number"
              name="vocalist"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
   
            />
          </div>
          <div className="w-[30%]">
            <label className="block text-sm text-gray-400">No. of Bassists</label>
            <input
              type="number"
              name="bassist"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
        
            />
          </div>

          <div className="w-[30%]">
            <label className="block text-sm text-gray-400">No. of Keyboardist</label>
            <input
              type="number"
              name="keyboardist"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
        
            />
          </div>

          <div className="w-[30%]">
            <label className="block text-sm text-gray-400">No. of Percussionist</label>
            <input
              type="number"
              name="percussionist"
              className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1"
        
            />
          </div>

        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400">Description</label>
          <textarea
            name="description"
            className="w-full bg-[#C1C2D3] text-black p-2 rounded-lg mt-1 placeholder-gray-500"
            rows="4"
            placeholder="We'd like to collaborate on an upcoming event..."
         
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="Submit"
            className="w-full bg-[#b70039] text-white py-2 rounded-lg cursor-pointer"
          />
        </div>
        
      </form>

        {/* Close Button */}
        <div className="mt-4">
          <button className="text-white" onClick={togglePopup}>Close</button>
        </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default App;
