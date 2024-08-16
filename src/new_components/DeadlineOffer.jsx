import React, { useState, useEffect } from "react";

const DeadlineOffer = () => {
  const initialTime = 30 * 60; // 30 minutes in seconds

  const getSavedTime = () => {
    const savedTime = localStorage.getItem("deadlineTimeLeft");
    const lastSave = localStorage.getItem("deadlineLastSave");
    const currentTime = Math.floor(Date.now() / 1000);

    if (savedTime && lastSave) {
      const elapsedTime = currentTime - lastSave;
      const remainingTime = Math.max(0, savedTime - elapsedTime);
      return remainingTime;
    }

    return initialTime;
  };

  const [timeLeft, setTimeLeft] = useState(getSavedTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem("deadlineTimeLeft", newTime);
          localStorage.setItem(
            "deadlineLastSave",
            Math.floor(Date.now() / 1000)
          );
          return newTime;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return ` ${String(minutes).padStart(2, "0")} ${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-white border-b-2 border-[#373737] pb-2 mb-2 ">
      <h1 className="text-lg text-center">Offer ends in:</h1>
      <div className="flex gap-2 items-center text-5xl font-bold justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[#eb5757]">
            {String(hours).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#eb5757]">
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#eb5757]">
            {String(seconds).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default DeadlineOffer;
