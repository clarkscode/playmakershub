import { useNavigate } from "react-router-dom";

const PlaymakersAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/adminonly");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="p-8 bg-[#1B1B1B] text-yellow-400 max-w-5xl mx-auto rounded-lg shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaymakersAdmin;
