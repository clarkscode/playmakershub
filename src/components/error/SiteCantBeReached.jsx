const SiteCantBeReached = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      {/* <img src={errorIcon} alt="Error icon" className="w-16 h-16 mb-4" /> */}
      <h1 className="text-2xl font-semibold mb-4">
        This site can’t be reached
      </h1>
      <p className="text-gray-600 text-center mb-4">
        The webpage at{" "}
        <a href="#" className="text-blue-500 break-all">
          https://www.example.com
        </a>{" "}
        might be temporarily down or it may have moved permanently to a new web
        address.
      </p>
      <p className="text-gray-500">
        <strong>ERR_ACCESS_DENIED</strong>
      </p>
    </div>
  );
};

export default SiteCantBeReached;
