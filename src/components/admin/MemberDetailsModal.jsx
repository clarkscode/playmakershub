import { useEffect } from "react";
import { FaCheckCircle, FaPen, FaTrash } from "react-icons/fa";

const MemberDetailsModal = ({ member, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    // remove event listener pag unmount
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  //   close the  modal pag mo click outside sa modal
  const handleClickOutside = (event) => {
    if (event.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      id="modal-overlay"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#C2396C] to-[#5C1B33] px-5 py-5 rounded-t-lg text-white relative">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">Member since</h2>
            <button
              className="text-gray-100 absolute top-3 right-3 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <p className="text-sm flex items-center">
            <span className="mr-2">🕒</span>
            {member.joinDate}
          </p>

          <div className="flex items-center mt-6">
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
              src={member.image}
              alt={member.name}
            />
            <div className="ml-4">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <div className="flex flex-wrap space-x-2 mt-2">
                {member.role.map((role, index) => (
                  <span
                    key={index}
                    className="bg-white text-pink-700 px-2 py-1 rounded-full text-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Edit Button */}
          <div className="flex items-center gap-2">
            <button className="absolute top-6 right-24 bg-[#5C1B33] py-2 px-4 rounded-full hover:bg-[#9c2953]">
              <FaPen className="text-blue-500" />
            </button>
            <button className="absolute top-6 right-10 bg-[#5C1B33] py-2 px-4 rounded-full hover:bg-[#9c2953]">
              <FaTrash className="text-[#FB4B4E]" />
            </button>
          </div>
          {/* Status Indicator */}
          <div className="absolute top-24 right-6 flex items-center space-x-2 text-white  rounded-lg">
            {member.status === "active" && (
              <FaCheckCircle className="text-[#40B267]" />
            )}
            <span
              className={`${
                member.status === "active"
                  ? "bg-[#40B267] py-1 px-3"
                  : member.status === "inactive"
                  ? "bg-[#FF9100] py-1 px-3"
                  : member.status === "warning"
                  ? "bg-[#FB4B4E] py-1 px-3"
                  : ""
              } text-sm`}
            >
              {member.status}
            </span>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-5 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <div>
              <p className="font-semibold text-sm">
                Total Events Participated:
              </p>
              <p>{member.events}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Genre:</p>
              <p>{member.genre.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Mobile Number:</p>
              <p>{member.mobile}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Email Address:</p>
              <p className="text-blue-500">{member.email}</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">Bio</p>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              atque ullam quas molestiae fugit, nisi repellendus magni enim,
              natus perspiciatis consequuntur doloribus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsModal;
