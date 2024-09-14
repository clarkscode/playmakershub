import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// progress bar
import LinearProgress from "@mui/material/LinearProgress";

const EventCard = ({
  eventTitle,
  organizer,
  email,
  location,
  genre,
  eventStart,
  eventEnd,
  status,
  department,
  organization,
  theme,
  participants,
  maxParticipants,
}) => {
  // Determine ang event status para sa specific styling and behavior
  const isRejected = status === "Rejected";
  const isAccepted = status === "Accepted";
  const isPending = status === "Pending";
  const isOngoing = status === "Ongoing";

  // e calculate ang percentage  sa participants
  const participationPercentage = Math.min(
    (participants / maxParticipants) * 100,
    100
  );

  return (
    <div
      className={`${
        isRejected ? "bg-gray-100 shadow-sm" : "bg-white shadow-md"
      } rounded-lg mb-6`}
    >
      {/* Card Header */}
      <div
        className={`${
          isRejected
            ? "bg-gradient-to-r from-gray-400 to-gray-500"
            : "bg-gradient-to-r from-[#C2396C] to-[#5C1B33]"
        } p-4 rounded-t-lg border-b-2 ${
          isRejected ? "border-gray-300" : "border-[#FBEBF1]"
        }`}
      >
        {/* Theme Tag */}
        {!genre && genre.length === 0 && theme && (
          <div className="mb-2">
            <span
              className={`${
                isRejected
                  ? "bg-gray-200 text-gray-700"
                  : "bg-[#FBEBF1] text-[#5C1B33]"
              } px-4 py-1 text-sm font-semibold rounded-full`}
            >
              {theme}
            </span>
          </div>
        )}

        {/* Event Title and Accepted Icon */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">{eventTitle}</h3>
          {isAccepted && (
            <CheckCircleIcon sx={{ color: "white", width: 30, height: 30 }} />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="mb-4">
          <p className="font-semibold">{organizer}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm">
            <LocationOnIcon sx={{ color: isRejected ? "gray" : "#5C1B33" }} />
            <span className="p-1 py-1 text-sm font-semibold">{location}</span>
          </p>

          {/* Department or Organization */}
          <div>
            <p className="flex items-center">
              <ApartmentIcon sx={{ color: isRejected ? "gray" : "#5C1B33" }} />
              <span className="p-1 py-1 text-sm font-semibold">
                {department || organization}
              </span>
            </p>
          </div>

          {genre && genre.length > 0 && (
            <div className="flex space-x-2 mt-4">
              {genre.map((genreItem, index) => (
                <span
                  key={index}
                  className={`${
                    isRejected
                      ? "bg-gray-300 text-gray-600"
                      : "bg-pink-500 text-white"
                  } px-4 py-1 text-sm font-semibold`}
                >
                  {genreItem}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Event Start</p>
            <p className="text-gray-700">
              {eventStart.date} <br />
              {eventStart.time}
            </p>
          </div>
          <div>
            <p className="font-semibold">Event End</p>
            <p className="text-gray-700">
              {eventEnd.date} <br />
              {eventEnd.time}
            </p>
          </div>
        </div>

        {/* Participation Bar */}
        {isOngoing && (
          <div className="mb-4">
            <p className="font-semibold mb-2">
              Participants: {participants}/{maxParticipants}
            </p>
            <LinearProgress
              variant="determinate"
              value={participationPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    participationPercentage === 100 ? "#5C1B33" : "#A7A7A7",
                },
              }}
            />
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          {isAccepted ? (
            <div className="w-full">
              <button className="bg-[#5C1B33] text-white px-4 py-2 rounded-lg w-full">
                Create Event
              </button>
            </div>
          ) : (
            <>
              {isPending ? (
                <>
                  <div className="w-full">
                    <button className="bg-[#6C6A76]/50 text-white px-4 py-2 rounded-lg w-full cursor-not-allowed">
                      Create Event
                    </button>
                  </div>
                  <div className="w-full">
                    <Menu
                      as="div"
                      className="relative inline-block text-left w-full"
                    >
                      <MenuButton className="flex items-center justify-center text-white bg-[#D94C2A]/50 px-4 py-2 rounded-lg w-full">
                        {status}
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </MenuButton>
                      <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-green-100 text-green-900"
                                    : "text-gray-900"
                                } group flex items-center px-4 py-2 text-sm w-full`}
                              >
                                <FaCheckCircle className="mr-2 text-green-600" />
                                Accept
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-red-100 text-red-900"
                                    : "text-gray-900"
                                } group flex items-center px-4 py-2 text-sm w-full`}
                              >
                                <FaTimesCircle className="mr-2 text-red-600" />
                                Reject
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </>
              ) : isOngoing ? (
                <div className="w-full">
                  <button
                    className={`${
                      participationPercentage === 100
                        ? "bg-[#5C1B33] text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    } px-4 py-2 rounded-lg w-full`}
                    disabled={participationPercentage < 100}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-lg w-full cursor-not-allowed">
                    Rejected
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
