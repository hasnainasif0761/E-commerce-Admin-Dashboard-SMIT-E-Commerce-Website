import React, { useState } from 'react';
import { Camera, Upload, Home, ChevronRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

function CreateUser({isCollapsed}) {
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    countryCode: 'US',
    contact: '',
    address: '',
    pinCode: '',
    city: '',
    country: '',
    notes: '',
    LiveImageurl:'',
    image:null
  });
      const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) =>{
      e.preventDefault();

  const data = new FormData();

  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("username", formData.username);
  data.append("email", formData.email);
  data.append("countryCode", formData.countryCode);
  data.append("contact", formData.contact);
  data.append("address", formData.address);
  data.append("pinCode", formData.pinCode);
  data.append("city", formData.city);
  data.append("country", formData.country);
  data.append("notes", formData.notes);
  if (formData.image) {
    data.append("image", formData.image);
  }

  const response = await fetch("http://localhost:4000/form/create-user", {
    method: "POST",
    body: data,
  });

const text = await response.text();

console.log("Backend response:", text);

if (!response.ok) {
  throw new Error(text);
}

const result = JSON.parse(text);
console.log(result);
  setFormData({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    countryCode: 'US',
    contact: '',
    address: '',
    pinCode: '',
    city: '',
    country: '',
    notes: '',
    LiveImageurl:'',
    image: null
  });
  toast.success("User created Successfully...",{position:'top-right',duration:4000})
  }


  return (
    <div className={`${isCollapsed ? 'ml-[80px] w-[calc(100%-80px)]' : 'ml-[260px] w-[calc(100%-260px)]'} `}>
        <div className='w-full h-20 '>
    <div className="min-h-screen bg-[#131930] text-slate-200 font-sans p-6 flex flex-col justify-between">
      <div>
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-xl font-semibold text-white">Create</h1>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Home size={14} className="text-purple-400" />
            <ChevronRight size={14} />
            <span className="text-slate-300">Customer</span>
            <ChevronRight size={14} />
            <span className="text-purple-400">Create</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} method='post'>
        {/* Form Container */}
        <div className="bg-[#1a213d] border border-slate-800 rounded-lg p-6 max-w-6xl mx-auto shadow-xl">
          {/* Section Title */}
          <h2 className="text-lg font-semibold text-white mb-6">New Customer</h2>

          {/* Profile Picture Upload Section */}
          <div className="flex items-center flex-col justify-between bg-[#131930]/40 p-4 rounded-lg border border-slate-800/60 mb-8">
            <div className='flex justify-between w-full'>
            <div className="flex items-center space-x-4 ">
              <div className="w-14 h-14 rounded-full bg-[#252e4d] flex items-center justify-center text-slate-400 border border-slate-700">
                {!formData.image && (<Camera size={24} />)}
                {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-14 h-14 rounded-full object-cover"
                />
              )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Personal Information</h3>
                <p className="text-xs text-blue-400 mt-0.5">Ya Jo Image ha Wo Multer ka zarya send hu ge uploads folder ko</p>
              </div>
            </div>
            <label className="flex items-center space-x-2 bg-[#233058] hover:bg-[#2c3d70] text-blue-400 text-xs font-medium px-4 py-2.5 rounded-md border border-blue-500/30 transition-colors cursor-pointer">
            <Upload size={14} />
            <span>Upload Picture</span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0]
                }))
              }
            />
          </label>
          </div>
          <div className='w-full mt-7'>
              <label className="block text-xs ml-1 text-slate-300 mb-1.5 font-medium">
                  Live Image Url <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.LiveImageurl}
                  onChange={handleChange}
                  placeholder="Enter Live Image Url"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* First Name */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* User Name */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  User Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter user name"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your mail"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="pt-2">
              <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                Contact <span className="text-red-500">*</span>
              </label>
              <div className="flex bg-[#131930] border border-slate-700/70 rounded-md overflow-hidden focus-within:border-blue-500">
                <div className="relative flex items-center border-r border-slate-700/70 px-3 py-2 bg-[#171f3a]">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="bg-transparent text-xs text-white appearance-none pr-5 focus:outline-none cursor-pointer"
                  >
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="PK">PK</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 text-slate-400 pointer-events-none" />
                </div>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="12365xx xxxxx"
                  className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">Address Information</h3>
            
            {/* Address */}
            <div className="pt-2">
              <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Pin Code */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="123456"
                  className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* City Dropdown */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-slate-400 appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="" disabled hidden>Select City</option>
                    <option value="Karachi" className="bg-[#131930] text-white">Karachi</option>
                    <option value="Lahore" className="bg-[#131930] text-white">Lahore</option>
                    <option value="New York" className="bg-[#131930] text-white">New York</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-slate-400 appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="" disabled hidden>Select Country</option>
                    <option value="Pakistan" className="bg-[#131930] text-white">Pakistan</option>
                    <option value="USA" className="bg-[#131930] text-white">USA</option>
                    <option value="UK" className="bg-[#131930] text-white">UK</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">Additional Notes</h3>
            
            <div className="pt-2">
              <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                Notes
              </label>
              <textarea
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional information about this customer..."
                className="w-full bg-[#131930] border border-slate-700/70 rounded-md p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center space-x-4 pt-4 border-t border-slate-800/60">
            <button
              type="button"
              className="text-red-500 hover:text-red-400 text-sm font-medium px-4 py-2 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#2a365c] cursor-pointer hover:bg-[#344475] text-slate-300 hover:text-white text-sm font-medium px-5 py-2 rounded-md border border-slate-600/40 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 pt-8 border-t border-slate-800/60 mt-8 max-w-6xl mx-auto w-full">
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
    </div>
  )
}

export default CreateUser