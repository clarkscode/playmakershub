import { useState } from "react";
import { Header } from "../components/admin/Header";
import MemberCard from "../components/admin/MemberCard";
import { Sidebar } from "../components/admin/SideBar";
import Modal from "../components/admin/Reusable/Modal";
import MemberForm from "../components/admin/Reusable/MemberForm";
import MemberDetailsModal from "../components/admin/MemberDetailsModal";
import { playmakersLogo } from "../assets";

const membersData = [
  {
    name: "Jie Clark Terec",
    email: "jieclark@ustp.edu.ph",
    role: ["Percussionist", "Keyboardist"],
    genre: ["Rock", "Jazz"],
    mobile: "0916513814",
    events: 32,
    joinDate: "June 06, 2024, 5:00 pm",
    status: "active",
    image: playmakersLogo,
  },
  {
    name: "Prince Edward Zacarias",
    email: "jieclark@ustp.edu.ph",
    role: ["Percussionist", "Keyboardist"],
    genre: ["Rock", "Jazz"],
    mobile: "0916513814",
    events: 32,
    joinDate: "July 13, 2020",
    status: "inactive",
    image: playmakersLogo,
  },
  {
    name: "James Heinrich Rocales",
    email: "rocales.jamesheinrich@ustp.edu.ph",
    role: ["Percussionist", "Keyboardist"],
    genre: ["Rock", "Jazz"],
    mobile: "0916513814",
    events: 32,
    joinDate: "July 13, 2020",
    status: "warning",
    image: playmakersLogo,
  },
];

const MemberOrganization = () => {
  const [members, setMembers] = useState(membersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: [],
    genre: [],
    mobile: "",
    events: "",
    joinDate: "",
    status: "active",
  });
  const [roles, setRoles] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filter, setFilter] = useState("all");

  /**
   *  Filtered members based sa status
   */
  const filteredMembers = members.filter((member) => {
    if (filter === "all") return true;
    return member.status === filter;
  });

  const handleCreateAccount = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedMember(null);
  };

  const handleSubmit = () => {
    setMembers([
      ...members,
      {
        ...newMember,
        role: roles,
        genre: genres,
        joinDate: new Date().toISOString().split("T")[0],
        events: 0,
      },
    ]);
    setIsModalOpen(false);
    setNewMember({
      name: "",
      email: "",
      role: [],
      genre: [],
      mobile: "",
      status: "active",
    });
    setRoles([]);
    setGenres([]);
  };

  /**
   * Tig Handle kung e view details ang selected member member pag e click ang specific member
   */
  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-[#FBEBF1]">
      <Sidebar />
      <div className="flex-1">
        <Header title="Member Organization" />

        <div className="px-8 py-4 flex items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex space-x-4">
            {["all", "active", "inactive", "warning"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 ${
                  filter === status ? "bg-gray-700 text-white" : "bg-gray-200"
                } rounded-lg`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} Members
              </button>
            ))}
          </div>
          <button
            className="bg-[#5C1B33] text-white px-6 py-2 rounded-lg"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>

        <div className="px-4 py-10 flex flex-wrap">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleViewDetails(member)}
            >
              <MemberCard {...member} />
            </div>
          ))}
        </div>
      </div>

      {/* Animal nga modal */}
      <Modal
        isOpen={isModalOpen}
        title="Create New Account"
        onClose={closeModal}
      >
        <MemberForm
          newMember={newMember}
          setNewMember={setNewMember}
          roles={roles}
          setRoles={setRoles}
          genres={genres}
          setGenres={setGenres}
          handleSubmit={handleSubmit}
        />
      </Modal>
      {/* Separate Modal para sa pag View sa Member Details */}
      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          isOpen={isDetailsModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MemberOrganization;
