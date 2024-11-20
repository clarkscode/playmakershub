import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
const AdminNotification = () => {
  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Notification" />
      </div>
    </div>
  );
};

export default AdminNotification;
