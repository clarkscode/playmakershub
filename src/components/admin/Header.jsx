import { useNavigate } from "react-router-dom";
import { playmakersLogo } from "../../assets";
import NotificationsIcon from "@mui/icons-material/Notifications";
export const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/adminonly");
    window.location.reload();
  };
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-[#5C1B33]">{title}</h1>
      <div className="flex items-center space-x-4">
        <NotificationsIcon sx={{ color: "#5C1B33" }} />
        <img
          src={playmakersLogo}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#5C1B33] text-white rounded hover:bg-[#702d46]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
