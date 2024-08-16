import { useState, useEffect } from "react";
import copy from "../assets/copy.svg";
import { closeIcon } from "../assets";

const BalanceModal = ({
  isOpen,
  onClose,
  balance,
  requiredAmount,
  walletAddress,
}) => {
  const [tooltipText, setTooltipText] = useState("Copy");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setTooltipText("Copied");

    // Revert tooltip text back to "Copy" after 1 second
    setTimeout(() => {
      setTooltipText("Copy");
    }, 1000);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    // Close the modal if clicked outside the modal content
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-[#1B1B1B] p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold my-3">
            Add funds to accept offer
          </h2>
          <button className="text-white" onClick={onClose}>
            <img src={closeIcon} alt="close" width={24} height={24} />
          </button>
        </div>
        <p className="text-white mb-4">
          You need{" "}
          <span className="font-bold">{requiredAmount.amount} ETH</span> +
          <span className="font-semibold ps-2 text-[#8fc7ff] text-sm">
            Gas Refundable Contract
          </span>
        </p>
        <p className="text-md text-gray-400 mt-2 mb-5">
          Transfer funds to your wallet. It can take up to a minute for your
          balance to update.
        </p>
        <div className="mt-4">
          <p className="text-white font-semibold mb-3">Your ETH Wallet:</p>
          <div className="bg-gray-800 p-4 mt-1 rounded-lg flex items-center justify-between relative">
            <span className="text-gray-400 text-sm truncate">
              {walletAddress}
            </span>
            <button
              className="text-white text-sm relative"
              onClick={handleCopy}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <img src={copy} alt="copy" width={20} height={20} />
              {showTooltip && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                  {tooltipText}
                </div>
              )}
            </button>
          </div>
          <p className="text-white mt-2 mb-5">
            Balance: <span className="font-bold">{balance} ETH</span>
          </p>
        </div>
        <button
          className="w-full bg-[#1E4B74] text-white py-3 mt-6 rounded-lg cursor-not-allowed opacity-50"
          disabled
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BalanceModal;
