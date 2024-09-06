const MemberCard = ({
  name,
  email,
  role,
  genre,
  mobile,
  events,
  joinDate,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-72 m-4">
      <div className="flex items-center space-x-4">
        <img src={image} alt={`${name}`} className="w-12 h-12 rounded-full" />
        <div className="max-w-[150px]">
          {" "}
          {/* Max width to limit the text */}
          <h3 className="text-lg font-bold truncate" title={name}>
            {/* Tooltip on hover */}
            {name}
          </h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Role:</p>
        <div className="flex space-x-2 flex-wrap">
          {role.map((r, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-pink-100 text-pink-600 rounded-full"
            >
              {r}
            </span>
          ))}
        </div>
        <p className="mt-2 font-semibold">Genre:</p>
        <p>{genre}</p>
        <p className="mt-2 font-semibold">Mobile No:</p>
        <p>{mobile}</p>
        <p className="mt-2 font-semibold">Total Events Participated:</p>
        <p>{events}</p>
        <p className="mt-2 font-semibold">Join Date:</p>
        <p>{joinDate}</p>
      </div>
      <button className="mt-4 w-full bg-[#5C1B33] text-white py-2 rounded-lg">
        View Details
      </button>
    </div>
  );
};

export default MemberCard;
