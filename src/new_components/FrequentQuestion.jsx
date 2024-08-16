import { useState, useRef } from "react";

const FrequentQuestion = ({ title, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="transition-all duration-300 cursor-pointer ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full"
      >
        <span className="text-lg font-semibold text-white text-start">
          {title}
        </span>

        <svg
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
        className={`px-4 sm:px-6 overflow-hidden transition-max-height duration-500 ease-in-out`}
      >
        <p className="text-white mt-10">{answer}</p>
      </div>
    </div>
  );
};

export default FrequentQuestion;
