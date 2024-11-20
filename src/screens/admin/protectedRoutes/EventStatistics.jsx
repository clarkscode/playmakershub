import Header from "../../../components/admin/Header";
import Sidebar from "../../../components/admin/Sidebar";

const EventStatistics = () => {
  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Event Statistics" />
      </div>
    </div>
  );
};

export default EventStatistics;
