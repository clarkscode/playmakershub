import Header from "./Header";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Profile" />
      </div>
    </div>
  );
};

export default Profile;
