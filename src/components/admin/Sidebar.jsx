import { Link, useLocation } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { playmakersLogo } from "../../assets";

export const Sidebar = () => {
  const location = useLocation();

  const activeStyle = "bg-[#5C1B33] text-white rounded-lg"; // Active background and text color
  const inactiveStyle = "text-gray-500"; // Inactive text and icon color

  return (
    <div className="w-full md:w-72 bg-white shadow-lg">
      <div className="p-4 flex items-center">
        <img
          src={playmakersLogo}
          width={70}
          height={70}
          alt="Playmakers Logo"
        />
        <h1 className="text-xl font-bold text-[#5C1B33] ml-4">Playmakers</h1>
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center py-3 px-4 text-md font-medium ${
              location.pathname === "/dashboard" ? activeStyle : inactiveStyle
            }`}
          >
            <WidgetsIcon
              className={`mr-2 ${
                location.pathname === "/dashboard"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            />{" "}
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/events-management"
            className={`flex items-center py-3 px-4 text-md font-medium ${
              location.pathname === "/events-management"
                ? activeStyle
                : inactiveStyle
            }`}
          >
            <EventIcon
              className={`mr-2 ${
                location.pathname === "/events-management"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            />{" "}
            Events Management
          </Link>
        </li>
        <li>
          <Link
            to="/member-organization"
            className={`flex items-center py-3 px-4 text-md font-medium ${
              location.pathname === "/member-organization"
                ? activeStyle
                : inactiveStyle
            }`}
          >
            <GroupIcon
              className={`mr-2 ${
                location.pathname === "/member-organization"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            />{" "}
            Member Organization
          </Link>
        </li>
        <li>
          <Link
            to="/event-statistics"
            className={`flex items-center py-3 px-4 text-md font-medium ${
              location.pathname === "/event-statistics"
                ? activeStyle
                : inactiveStyle
            }`}
          >
            <AssessmentIcon
              className={`mr-2 ${
                location.pathname === "/event-statistics"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            />{" "}
            Event Statistics
          </Link>
        </li>
      </ul>
    </div>
  );
};
