import React from 'react';
import { 
  Search, 
  Sliders, 
  Menu, 
  Cast, 
  Languages, 
  Bell, 
  Maximize, 
  Settings 
} from 'lucide-react';

const DashboardHeader = ({toggleSidebar}) => {
  return (
    <header className="w-full fixed bg-[#111936] text-white px-6 py-3 flex items-center justify-between border-b border-[#1e295d]/40">
      {/* Left Section: Logo & Toggle Button */}
      <div className="flex items-center gap-6">
        {/* Berry Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#673ab7] to-[#05866a] flex items-center justify-center p-1.5 shadow-md">
            {/* Custom Beaker/Berry Logo Icon */}
            <img src="logo.png" alt="logo" className='w-12' />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">BERRY</span>
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button onClick={toggleSidebar} className="w-9 cursor-pointer h-9 rounded-lg bg-[#1e2746] hover:bg-[#28355c] flex items-center justify-center text-[#7c4dff] transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar Input */}
        <div className="relative flex items-center w-80">
          <div className="absolute left-3.5 text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#1a223f] border border-[#263259] text-sm text-gray-200 placeholder-gray-400 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#7c4dff] transition-all"
          />
          <button className="absolute right-2 p-1.5 rounded-lg bg-[#283358] hover:bg-[#32406d] text-[#7c4dff] transition-colors">
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Section: Actions & Profile Pill */}
      <div className="flex items-center gap-3">
        {/* Icon Action Buttons */}
        <button className="w-10 h-10 rounded-xl bg-[#1a223f] hover:bg-[#232d52] flex items-center justify-center text-[#7c4dff] transition-colors">
          <Cast className="w-5 h-5" />
        </button>

        <button className="w-10 h-10 rounded-xl bg-[#1a223f] hover:bg-[#232d52] flex items-center justify-center text-[#2196f3] transition-colors">
          <Languages className="w-5 h-5" />
        </button>

        <button className="w-10 h-10 rounded-xl bg-[#1a223f] hover:bg-[#232d52] flex items-center justify-center text-[#ffb74d] transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <button className="w-10 h-10 rounded-xl bg-[#1a223f] hover:bg-[#232d52] flex items-center justify-center text-[#2196f3] transition-colors">
          <Maximize className="w-5 h-5" />
        </button>

        {/* Profile Badge Pill */}
        <div className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-[#1d274b] hover:bg-[#25325f] cursor-pointer transition-colors border border-[#2b396b]/50 ml-2">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover border border-[#2196f3]"
          />
          <Settings className="w-4 h-4 text-[#2196f3]" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;