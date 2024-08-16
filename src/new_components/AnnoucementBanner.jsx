const AnnoucementBanner = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="bg-[#F2994A] text-white py-2 px-4 text-center">
      <p className="text-xs text-black font-semibold">
        Beware of scams! This is the only official website of OpenSea.
      </p>
    </div>
  );
};

export default AnnoucementBanner;
