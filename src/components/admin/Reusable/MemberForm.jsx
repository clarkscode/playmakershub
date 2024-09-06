import { useState } from "react";

const MemberForm = ({
  newMember,
  setNewMember,
  roles,
  setRoles,
  genres,
  setGenres,
  handleSubmit,
}) => {
  const [newRole, setNewRole] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const handleAddRole = () => {
    if (newRole) {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  const handleAddGenre = () => {
    if (newGenre) {
      setGenres([...genres, newGenre]);
      setNewGenre("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={newMember.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={newMember.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Role(s)
        </label>
        <div className="flex space-x-2 justify-between">
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Enter role"
          />
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleAddRole}
          >
            Add Role
          </button>
        </div>
        <div className="mt-2">
          {roles.map((role, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full mr-2 text-sm"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Genre(s)
        </label>
        <div className="flex space-x-2 justify-between">
          <input
            type="text"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Enter genre"
          />
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleAddGenre}
          >
            Add Genre
          </button>
        </div>
        <div className="mt-2">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full mr-2 text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile"
          value={newMember.mobile}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          placeholder="Enter mobile number"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default MemberForm;
