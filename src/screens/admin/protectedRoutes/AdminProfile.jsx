import Header from "../../../components/admin/Header";
import Sidebar from "../../../components/admin/Sidebar";

const AdminProfile = () => {
  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Profile" />
      </div>
    </div>
  );
};

export default AdminProfile;
