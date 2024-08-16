export const WalletUpdater = ({
  walletAddress,
  onWalletChange,
  onUpdateWallet,
}) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Change Link Address</h2>
    <div className="flex space-x-4">
      <input
        type="text"
        value={walletAddress}
        onChange={onWalletChange}
        className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-200"
      />
      <button
        onClick={onUpdateWallet}
        className="p-3 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-600 transition"
      >
        Save
      </button>
    </div>
  </div>
);
