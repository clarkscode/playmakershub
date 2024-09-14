import Sidebar from "./Sidebar";
import Header from "./Header";
const Notification = () => {
  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Notification" />
      </div>
    </div>
  );
};

export default Notification;
