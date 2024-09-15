import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleLoginClick = () => {
    navigate("/login"); // This will navigate to the login page when the button is clicked
  };

  return (
    <div className="bg-Radial h-screen bg-[#000000]">
      <header className="flex items-center justify-between p-4 shadow-md">
        <h1 className="text-xl font-poppins text-[#fafafa]">NAVIGATION BAR</h1>
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
};

export default App;
