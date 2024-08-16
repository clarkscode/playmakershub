import FrequentQuestion from "./FrequentQuestion";

const Accordion = () => {
  const openTidioChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  };

  return (
    <section id="faq" className="py-10 sm:py-16 lg:py-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
        <div className="max-w-2xl mx-auto text-center mb-48 ">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white/80">
            Learn answers to frequently asked questions on OpenSea
          </p>
        </div>

        <div className="max-w-1xl mx-auto mt-8 grid grid-cols-1 gap-9 md:grid-cols-2  md:mt-16">
          <FrequentQuestion
            title="What is a contract?"
            answer="Fundable contracts are a core part of the on-chain that powers non-fungible tokens (NFTs), decentralized applications (dApps), and decentralized finance (DeFi) protocols. It helps track an NFT's ownership records,  history and those of related NFTs cannot be erased or deleted, making it possible to verify and easily transfer the digital item from one owner to the next without the need for a third-party intermediary."
          />
          <FrequentQuestion
            title="How do contracts work?"
            answer="It's also important to note that certain interactions with smart contracts require gas fees. In web3, the term 'gas fee' refers to the payment needed to execute transactions on the blockchain. These payments compensate the validators who keep the blockchain functioning. This validation helps ensure the blockchain has a permanent, immutable record."
          />
          <FrequentQuestion
            title="Is Contract refunded?"
            answer="A contract where the funds or payments made by the seller are returned under certain conditions. Typically, this occurs when the contract is successful and specific terms and requirements are met. This ensures that the financial commitment made by the seller is refunded after the agreed-upon conditions are fulfilled."
          />
          <FrequentQuestion
            title=" What is a private key?"
            answer="A private key is a secret piece of data used in cryptographic systems to secure and authenticate information. It is part of a pair, with the public key being the other. The private key is kept confidential and is used to decrypt messages or sign digital documents, proving that the message or transaction was authorized by the owner of the private key."
          />
          <FrequentQuestion
            title="Why can't the seller receive the offer if they don't fund the contract?"
            answer="The seller must fund the contract to activate or secure the offer because the funding typically represents a commitment or deposit required to proceed. This financial commitment ensures that the seller is serious about the transaction and can meet their obligations. Without this funding, the offer may not be processed or considered valid, as it confirms that the seller is prepared to move forward with the contract."
          />
          <FrequentQuestion
            title="What does it mean to hit 100 percent if the seller funds the contract?"
            answer="If the seller funds the contract and achieves '100 percent', it means that the full required amount or funding target has been met. Reaching 100 percent indicates that the seller has fulfilled their financial obligation, enabling the contract or offer to be fully executed. This full funding confirms that all conditions for proceeding have been satisfied and allows the associated benefits or terms to be applied."
          />
        </div>

        <div className="flex justify-center mt-10 gap-4">
          <p className=" text-white text-base">
            Didn&apos;t find the answer you are looking for?{" "}
          </p>
          <button
            title="Contact our support"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline "
            onClick={openTidioChat}
          >
            Contact our support
          </button>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
