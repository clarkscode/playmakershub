export const NFTList = ({ nftData, onRemoveNFT }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Added NFTs</h2>
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      {nftData.map((nft) => (
        <div key={nft.id} className="flex justify-between items-center">
          <span className="text-gray-200">{nft.title}</span>
          <img src={nft.imageUrl} alt="image" width={50} height={50} />
          <button
            onClick={() => onRemoveNFT(nft.id)}
            className="bg-red-500 text-gray-900 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
);
