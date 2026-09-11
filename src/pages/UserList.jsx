import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, ChevronDown, Edit, Trash2 } from 'lucide-react';

const UserList = ({ isCollapsed }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch Users From Backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://smit-ecommerce-website-backend.vercel.app/form/users");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.users);
      } catch (error) {
        console.log("Fetch Users Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(users.map((u) => u._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Search Filter
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete User
  const handleDeleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `https://smit-ecommerce-website-backend.vercel.app/form/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user");
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== id)
    );

    console.log(data.message);

  } catch (error) {
    console.log("Delete User Error:", error);
  }
};

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'ml-[80px] mt-[80px] w-[calc(100%-80px)]' : 'ml-[260px] mt-[70px] w-[calc(100%-260px)]'}`}>
      <div className="min-h-screen bg-[#131930] text-slate-200 font-sans p-6 flex flex-col justify-between">

        <div>

          {/* Table Container */}
          <div className="bg-[#1a213d] border border-slate-800 rounded-lg p-5 max-w-7xl mx-auto shadow-xl">

            {/* Top Bar: Search and Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#131930] border border-slate-700/60 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">

                <button className="flex items-center space-x-1.5 bg-[#1e2a4a] hover:bg-[#25355e] text-blue-400 border border-blue-500/30 text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors">
                  <Download size={14} />
                  <span>Download</span>
                </button>

                <button className="flex items-center space-x-1.5 bg-[#1d70f5] hover:bg-[#1660d6] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors">
                  <Plus size={14} />
                  <span>Add New</span>
                </button>

              </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse">

                <thead>

                  <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-300">

                    <th className="py-3 px-3 w-10">

                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedRows.length === users.length &&
                          users.length > 0
                        }
                        className="rounded bg-[#131930] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600"
                      />

                    </th>

                    <th className="py-3 px-3">Customer Name</th>

                    <th className="py-3 px-3">Email</th>

                    <th className="py-3 px-3">Phone</th>

                    <th className="py-3 px-3">Country</th>

                    <th className="py-3 px-3">Status</th>

                    <th className="py-3 px-3 text-center">Action</th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-800/50 text-xs">

                  {loading ? (

                    <tr>
                      <td
                        colSpan="7"
                        className="py-8 text-center text-slate-400"
                      >
                        Loading users...
                      </td>
                    </tr>

                  ) : filteredUsers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="7"
                        className="py-8 text-center text-slate-400"
                      >
                        No users found
                      </td>
                    </tr>

                  ) : (

                    filteredUsers.map((user) => (

                      <tr
                        key={user._id}
                        className="hover:bg-[#151c35] transition-colors"
                      >

                        {/* Checkbox */}
                        <td className="py-3.5 px-3">

                          <input
                            type="checkbox"
                            checked={selectedRows.includes(user._id)}
                            onChange={() => handleSelectRow(user._id)}
                            className="rounded bg-[#131930] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600"
                          />

                        </td>


                        {/* Customer Name & Avatar */}
                        <td className="py-3.5 px-3">

                          <div className="flex items-center space-x-3">

                            <img
                              src={
                                user.LiveUrl}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="w-8 h-8 rounded-full object-cover border border-slate-700"
                            />

                            <div>

                              <div className="font-semibold text-white text-xs">
                                {user.firstName} {user.lastName}
                              </div>

                              <div className="text-[11px] text-slate-400">
                                {user.username}
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* Email */}
                        <td className="py-3.5 px-3 text-slate-300 font-medium">
                          {user.email}
                        </td>


                        {/* Phone */}
                        <td className="py-3.5 px-3 text-slate-300">
                          {user.contact}
                        </td>


                        {/* Country */}
                        <td className="py-3.5 px-3 text-slate-300">
                          {user.country}
                        </td>


                        {/* Status Badge */}
                        <td className="py-3.5 px-3">

                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                            Active
                          </span>

                        </td>


                        {/* Action */}
                        <td className="py-3.5 px-3 text-center">

                          <div className="flex items-center justify-center gap-2">

  <button
    onClick={() => {
      setEditUser(user);
      setShowEditModal(true);
    }}
    className="flex items-center gap-1.5 bg-[#1e2a4a] hover:bg-[#25355e] text-blue-400 border border-blue-500/30 px-2.5 py-1.5 rounded-md text-[11px]"
  >
    <Edit size={13} />
    Edit
  </button>

  <button
    onClick={() => handleDeleteUser(user._id)}
    className="flex items-center gap-1.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-md text-[11px]"
  >
    <Trash2 size={13} />
    Delete
  </button>

</div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>


            {/* Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-6 pt-4 text-xs text-slate-400">

              <div className="flex items-center space-x-2">

                <span>Rows per page:</span>

                <div className="relative">

                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="bg-[#131930] border border-slate-700/60 rounded px-2 py-1 pr-6 text-white appearance-none focus:outline-none cursor-pointer"
                  >

                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>

                  </select>

                  <ChevronDown
                    size={12}
                    className="absolute right-1.5 top-2 text-slate-400 pointer-events-none"
                  />

                </div>

              </div>


              <div>
                {filteredUsers.length > 0
                  ? `1–${filteredUsers.length} of ${filteredUsers.length}`
                  : "0 of 0"}
              </div>


              <div className="flex items-center space-x-1">

                <button className="p-1 hover:text-white text-slate-500 cursor-not-allowed">
                  <ChevronLeft size={16} />
                </button>

                <button className="p-1 hover:text-white text-slate-300 transition-colors">
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 pt-8 border-t border-slate-800/60 mt-8 max-w-7xl mx-auto w-full">

          <div>
            © All rights reserved <span className="text-purple-400 font-medium cursor-pointer">CodedThemes</span>
          </div>

          <div className="flex space-x-4 mt-2 md:mt-0">

            <a href="#" className="hover:text-slate-400">
              License
            </a>

            <a href="#" className="hover:text-slate-400">
              Hire us
            </a>

            <a href="#" className="hover:text-slate-400">
              Terms
            </a>

            <a href="#" className="hover:text-slate-400">
              Figma Design System
            </a>

          </div>

        </div>

      </div>
                  {showEditModal && editUser && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1a213d] border border-slate-700 rounded-lg shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Edit User
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Update customer information
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowEditModal(false);
            setEditUser(null);
          }}
          className="text-slate-400 hover:text-white text-xl"
        >
          ×
        </button>

      </div>


      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {

            const response = await fetch(
              `https://smit-ecommerce-website-backend.vercel.app/form/users/${editUser._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(editUser),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(
                data.message || "User update failed"
              );
            }

            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === editUser._id
                  ? data.user
                  : user
              )
            );

            setShowEditModal(false);
            setEditUser(null);

          } catch (error) {

            console.log("Update User Error:", error);

          }
        }}
        className="p-6 space-y-5"
      >

        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              First Name
            </label>

            <input
              type="text"
              value={editUser.firstName || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  firstName: e.target.value,
                })
              }
              required
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Last Name
            </label>

            <input
              type="text"
              value={editUser.lastName || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  lastName: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* Username + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Username
            </label>

            <input
              type="text"
              value={editUser.username || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  username: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Email
            </label>

            <input
              type="email"
              value={editUser.email || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  email: e.target.value,
                })
              }
              required
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* Contact + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Contact
            </label>

            <input
              type="text"
              value={editUser.contact || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  contact: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Country
            </label>

            <input
              type="text"
              value={editUser.country || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  country: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* City + Pin Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              City
            </label>

            <input
              type="text"
              value={editUser.city || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  city: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Pin Code
            </label>

            <input
              type="text"
              value={editUser.pinCode || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  pinCode: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* Address */}
        <div>

          <label className="block text-xs text-slate-300 mb-1.5">
            Address
          </label>

          <input
            type="text"
            value={editUser.address || ""}
            onChange={(e) =>
              setEditUser({
                ...editUser,
                address: e.target.value,
              })
            }
            className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
          />

        </div>


        {/* Notes */}
        <div>

          <label className="block text-xs text-slate-300 mb-1.5">
            Notes
          </label>

          <textarea
            rows="3"
            value={editUser.notes || ""}
            onChange={(e) =>
              setEditUser({
                ...editUser,
                notes: e.target.value,
              })
            }
            className="w-full bg-[#131930] border border-slate-700/70 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
          />

        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">

          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditUser(null);
            }}
            className="text-red-400 hover:text-red-300 text-sm px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#2a365c] hover:bg-[#344475] text-white text-sm font-medium px-5 py-2 rounded-md"
          >
            Update User
          </button>

        </div>

      </form>

    </div>

  </div>

)}
    </div>
  );
};

export default UserList;
