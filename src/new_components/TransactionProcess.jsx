import { useEffect, useState } from "react";
import { loading } from "../assets";
import { closeIcon } from "../assets";

const TransactionProcess = ({ isOpen, onClose }) => {
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Generate a random transaction hash (64 characters long)
      const randomHash = `0x${[...Array(64)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`;
      setTransactionHash(randomHash);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Shorten the transaction hash for display
  const shortenedHash = `${transactionHash.slice(
    0,
    6
  )}...${transactionHash.slice(-4)}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="bg-[#252525] p-8 rounded-lg shadow-lg z-10 max-w-md lg:max-w-xl mx-auto text-white h-80">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <img src={closeIcon} alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={loading}
            alt="loading svg"
            width={50}
            height={50}
            className="mb-5 animate-spin"
          />
          {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-6"></div> */}
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Your sale is processing...
          </h2>
          <p className="mb-4 text-center text-gray-400 mb-5">
            Your transaction is processing. It should be confirmed on the
            blockchain shortly.
          </p>
          <p className="text-center text-xs font-semibold text-[#99A0A3] mb-3">
            TRANSACTION ID
          </p>
          {/* <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            {shortenedHash}
          </a> */}
          <p className="text-blue-400">{shortenedHash}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionProcess;
