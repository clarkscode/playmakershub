import { ethWhite, menu } from "../assets";
import eth from "../assets/eth.svg";
import DeadlineOffer from "./DeadlineOffer";
const NFTCard = ({ cards, ethPriceUSD }) => {
  return (
    <div className="relative mt-12 lg:mt-0 lg:w-[60%] order-1 lg:order-1">
      {/* <h2 className="text-lg font-semibold text-start text-white mb-5">
        Pending Offers
      </h2> */}
      {cards.length === 1 ? (
        <div className="relative w-full overflow-auto">
          <div className="flex gap-8 flex-nowrap border-2 border-[#373737] rounded-lg">
            <div className="flex-none w-full sm:w-2/3 lg:w-full lg:flex-1">
              <div className="overflow-hidden bg-[#1B1B1B] rounded shadow-xl">
                <div className="p-2 bg-[#202020]">
                  <img src={ethWhite} alt="ETH logo" width={18} height={18} />
                </div>
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    className="object-cover w-full h-96"
                    src={cards[0].imageUrl}
                    alt={cards[0].title}
                  />
                </div>

                <div className=" border-t-2 border-b-2 border-[#373737] p-4 flex gap-4">
                  <img src={menu} alt="description" className=" rotate-180" />
                  <p className="text-white font-semibold">Description</p>
                </div>
                <div className="border-b-2 border-[#373737] p-8">
                  <div className="flex gap-2 ">
                    <span className="text-[#9D9D9D]">By</span>
                    <p className="text-white font-semibold">{cards[0].owner}</p>
                  </div>
                  <p className="text-md leading-md text-white">
                    {cards[0].description}
                  </p>
                </div>
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {cards[0].title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest text-white uppercase">
                      Total ETH Offered
                    </p>
                    <div className="flex items-end mt-1">
                      <p className="text-2xl font-bold text-white">
                        {cards[0].price} {cards[0].symbol}
                      </p>
                      <p className="ml-2 text-md font-medium text-[#A8A8A8]">
                        (
                        {ethPriceUSD
                          ? (cards[0].price * ethPriceUSD).toFixed(2)
                          : "Loading..."}
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full overflow-x-auto flex space-x-6 py-4 scrollbar-hide">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-none w-80 bg-[#1B1B1B] rounded-lg shadow-xl border-2 border-[#373737]"
            >
              <div className="p-2 bg-[#202020]">
                <img src={ethWhite} alt="ETH logo" width={18} height={18} />
              </div>
              <div className="aspect-w-4 aspect-h-3">
                <img
                  className="object-cover w-full h-full "
                  src={card.imageUrl}
                  alt={card.title}
                />
              </div>
              <div className="p-6">
                <h1 className="text-[#A8A8A8]">
                  Owned by{" "}
                  <span className="font-semibold text-[#8fc7ff]">
                    {card.owner}
                  </span>
                </h1>
                <p className="text-lg font-bold text-white">{card.title}</p>
                {/* description */}
                <div className="border-t-2 border-[#373737] mt-1">
                  <p className="text-[#A8A8A8] text-sm capitalize py-2">
                    {card.description}
                  </p>
                </div>
                <p className="mt-6 text-xs font-medium tracking-widest text-white uppercase">
                  To receive
                </p>
                <div className="flex items-end mt-1">
                  <p className="text-2xl font-bold text-white">
                    {card.price} ETH
                  </p>
                  <p className="ml-2 text-md font-medium text-[#A8A8A8]">
                    (
                    {ethPriceUSD
                      ? `$${(card.price * ethPriceUSD).toFixed(2)}`
                      : "Loading..."}
                    )
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTCard;
