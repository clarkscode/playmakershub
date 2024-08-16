import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PercentageBar = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate the value change
    let start = 0;
    const increment = Math.ceil(value / 100); // Control the speed of the animation

    const animate = () => {
      start += increment;
      if (start <= value) {
        setAnimatedValue(start);
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value);
      }
    };

    animate();
  }, [value]);

  // Format the value to two decimal places
  const formattedValue = animatedValue.toFixed(2);

  return (
    <div className="relative w-full h-7 bg-gray-700 rounded-full overflow-hidden ">
      <div
        className="absolute top-0 left-0 h-full bg-[#2081E2] transition-all duration-500 ease-in-out"
        style={{ width: `${animatedValue}%` }}
      ></div>
      <div
        className="absolute top-0 left-0 h-full flex items-center justify-center transition-all duration-500 ease-in-out"
        style={{ width: `${animatedValue}%` }}
      >
        <span className="text-white font-extrabold">{formattedValue}%</span>
      </div>
    </div>
  );
};

PercentageBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default PercentageBar;
