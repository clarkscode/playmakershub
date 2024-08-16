import { useState, useEffect } from "react";
import {
  fetchAllNFT,
  fetchWalletAddress,
  fetchAmount,
  insertNFT,
  removeNFT,
  updateWalletAddress,
  updateAmount,
} from "../database/supabase";
import toast, { Toaster } from "react-hot-toast";
import { AmountUpdater } from "../components/AmountUpdater";
import { WalletUpdater } from "../components/WalletUpdater";
import { NFTList } from "../components/NFTList";
import { AddNFTForm } from "../components/AddNFTForm";
import { useNavigate } from "react-router-dom";
// Helper function to reset NFT form
const getEmptyNFT = () => ({
  imageUrl: "",
  title: "",
  owner: "",
  price: "",
  from: "",
  description: "",
  quantity: "1",
  status: "pending",
});

const MayamangPobre = () => {
  const [nftData, setNftData] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [newNFT, setNewNFT] = useState(getEmptyNFT());
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        const [nftList, walletData, amountData] = await Promise.all([
          fetchAllNFT(),
          fetchWalletAddress(),
          fetchAmount(),
        ]);

        setNftData(nftList);
        setWalletAddress(walletData);
        setAmount(amountData.amount);
      } catch (error) {
        toast.error("Failed to fetch initial data.");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNFT((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNFT = async () => {
    const { imageUrl, title, owner, price, from, description } = newNFT;

    if (!imageUrl || !title || !owner || !price || !from || !description) {
      toast.error("Please fill in all fields before adding an NFT.");
      return;
    }
    setNftData((prev) => [...prev, { ...newNFT }]);

    const result = await insertNFT(newNFT)
      .then(() => {
        setNewNFT(getEmptyNFT());
        toast.success("NFT added successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add NFT. Please try again.");
        console.log(error);
      });
  };

  const handleRemoveNFT = async (id) => {
    const result = await removeNFT(id)
      .then(() => {
        setNftData((prev) => prev.filter((nft) => nft.id !== id));
        toast.success("NFT removed successfully!");
      })
      .catch((error) => {
        toast.error("Failed to remove NFT. Please try again.");
        console.log(error);
      });
  };

  const handleUpdateWalletAddress = async () => {
    const result = await updateWalletAddress(walletAddress)
      .then(() => {
        toast.success("Wallet address updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update wallet address. Please try again.");
        console.log(error);
      });
  };

  const handleUpdateAmount = async () => {
    const result = await updateAmount(amount)
      .then(() => {
        toast.success("Amount updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update amount. Please try again.");
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="p-8 bg-[#1B1B1B] text-yellow-400 max-w-5xl mx-auto rounded-lg shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <AddNFTForm
          newNFT={newNFT}
          onInputChange={handleInputChange}
          onAddNFT={handleAddNFT}
        />
        <NFTList nftData={nftData} onRemoveNFT={handleRemoveNFT} />
        <WalletUpdater
          walletAddress={walletAddress}
          onWalletChange={(e) => setWalletAddress(e.target.value)}
          onUpdateWallet={handleUpdateWalletAddress}
        />
        <AmountUpdater
          amount={amount}
          onAmountChange={(e) => setAmount(e.target.value)}
          onUpdateAmount={handleUpdateAmount}
        />
        <Toaster />
      </div>
    </div>
  );
};

export default MayamangPobre;
