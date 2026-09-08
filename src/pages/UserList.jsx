import React, { useState } from 'react';
import { Search, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const UserList = ({ isCollapsed}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data matching the design image
  const users = [
    {
      id: 1,
      name: 'Caroline Pandolfi',
      email: 'caroline1@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      phone: '6187873453',
      country: 'United States',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Liam Smith',
      email: 'liam2@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      phone: '2125551234',
      country: 'United States',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Emma Johnson',
      email: 'emma3@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      phone: '3105555678',
      country: 'Canada',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Noah Brown',
      email: 'noah4@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      phone: '4155559999',
      country: 'United Kingdom',
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Olivia Davis',
      email: 'olivia5@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      phone: '6465551111',
      country: 'United States',
      status: 'Active',
    },
    {
      id: 6,
      name: 'William Miller',
      email: 'william6@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      phone: '7185552222',
      country: 'Canada',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Sophia Wilson',
      email: 'sophia7@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      phone: '9175553333',
      country: 'United States',
      status: 'Inactive',
    },
    {
      id: 8,
      name: 'James Moore',
      email: 'james8@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
      phone: '2025554444',
      country: 'United Kingdom',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Isabella Taylor',
      email: 'isabella9@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      phone: '3055555555',
      country: 'Canada',
      status: 'Active',
    },
    {
      id: 10,
      name: 'Benjamin Anderson',
      email: 'benjamin10@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
      phone: '4085556666',
      country: 'United States',
      status: 'Inactive',
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(users.map((u) => u.id));
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

  // Search Filter Implementation
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                        checked={selectedRows.length === users.length && users.length > 0}
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#151c35] transition-colors">
                      {/* Checkbox */}
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(user.id)}
                          onChange={() => handleSelectRow(user.id)}
                          className="rounded bg-[#131930] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600"
                        />
                      </td>

                      {/* Customer Name & Avatar */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <div className="font-semibold text-white text-xs">{user.name}</div>
                            <div className="text-[11px] text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-3 text-slate-300 font-medium">{user.email}</td>

                      {/* Phone */}
                      <td className="py-3.5 px-3 text-slate-300">{user.phone}</td>

                      {/* Country */}
                      <td className="py-3.5 px-3 text-slate-300">{user.country}</td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                            user.status === 'Active'
                              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                              : 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-center">
                        <button className="text-slate-400 hover:text-white p-1 rounded transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                  <ChevronDown size={12} className="absolute right-1.5 top-2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>1–10 of 14</div>

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
            <a href="#" className="hover:text-slate-400">License</a>
            <a href="#" className="hover:text-slate-400">Hire us</a>
            <a href="#" className="hover:text-slate-400">Terms</a>
            <a href="#" className="hover:text-slate-400">Figma Design System</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;