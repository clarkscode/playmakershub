import { useState } from "react";
import { Sidebar } from "../components/admin/SideBar";
import { Header } from "../components/admin/Header";
import PendingEvents from "../components/admin/PendingEvents";
import PastEvents from "../components/admin/PastEvents";
import PublishedEvents from "../components/admin/PublishedEvents";
import RejectedEvents from "../components/admin/RejectedEvents";
import ApprovedEvents from "../components/admin/ApprovedEvents";
import OngoingEvents from "../components/admin/OngoingEvents";
import AcceptedEvents from "../components/admin/AcceptedEvents";

const EventManagement = () => {
  const [activeTab, setActiveTab] = useState("recentlyAdded");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header Component */}
        <Header title="Event Management" />

        {/* Event Management Content */}
        <div className="p-4">
          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="flex mt-4 bg-white rounded-lg p-2 stroke-[#A7A9C0]">
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "PendingEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("PendingEvents")}
              >
                Pending Events
              </button>
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "RejectedEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("RejectedEvents")}
              >
                Rejected Events
              </button>
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "AcceptedEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("AcceptedEvents")}
              >
                Accepted Events
              </button>
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "OngoingEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("OngoingEvents")}
              >
                Ongoing Events
              </button>
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "ApprovedEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("ApprovedEvents")}
              >
                Approved Events
              </button>

              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "PublishedEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("PublishedEvents")}
              >
                Published Events
              </button>
              <button
                className={`p-2 text-[#4B4B4C] font-bold px-5 text-sm ${
                  activeTab === "PastEvents"
                    ? "border-b-2 border-[#5C1B33]"
                    : ""
                }`}
                onClick={() => handleTabChange("PastEvents")}
              >
                Past Events
              </button>
            </div>

            {/* Content Based sa  Active Tab */}
            <div className="mt-4">
              {activeTab === "PendingEvents" && <PendingEvents />}
              {activeTab === "AcceptedEvents" && <AcceptedEvents />}
              {activeTab === "PastEvents" && <PastEvents />}
              {activeTab === "PublishedEvents" && <PublishedEvents />}
              {activeTab === "RejectedEvents" && <RejectedEvents />}
              {activeTab === "ApprovedEvents" && <ApprovedEvents />}
              {activeTab === "OngoingEvents" && <OngoingEvents />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
