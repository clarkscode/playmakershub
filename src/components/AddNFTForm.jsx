const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const AddNFTForm = ({ newNFT, onInputChange, onAddNFT }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Add NFT</h2>
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {Object.keys(newNFT).map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={capitalize(field)}
          value={newNFT[field]}
          onChange={onInputChange}
          className="col-span-1 md:col-span-1 p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-200"
        />
      ))}
      <button
        onClick={onAddNFT}
        className="col-span-1 md:col-span-1 p-3 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-600 transition"
      >
        Add
      </button>
    </div>
  </div>
);
