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
    <div id="blur" className={popupVisible ? "active" : ""}>
      <header className="flex items-center justify-between p-4 shadow-md">
        <h1 className="text-xl font-bold text-[#FFFFFF]">Landing</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-[#FFFFFF] text-black rounded hover:bg-[#9e9c9d]"
          >
            Login
          </button>
        </div>
      </header>
      <main>
        <div className="main-content">
          <img
            src="playmakerslogo.png"
            alt="Playmakers Logo"
            className="logo"
          />
          <div className="main-text-container">
            <h1 className="main-text">
              Exploring Music
              <br />
              Within You
            </h1>
            <a href="#" className="sub-text">
              About us -&gt;
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
