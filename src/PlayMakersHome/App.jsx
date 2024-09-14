import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

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
    <div id="blur" className={popupVisible ? 'active' : ''}>
      <header>
        <nav>
          {/* Login Button placed inside nav and styled for proper positioning */}
          <a href="" className="MloginBtn" onClick={handleLoginClick}>
            Login
          </a>
        </nav>
      </header>
      <main>
        <div className="main-content">
          <img src="playmakerslogo.png" alt="Playmakers Logo" className="logo" />
          <div className="main-text-container">
            <h1 className="main-text">Exploring Music<br />Within You</h1>
            <a href="#" className="sub-text">About us -&gt;</a>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default App;