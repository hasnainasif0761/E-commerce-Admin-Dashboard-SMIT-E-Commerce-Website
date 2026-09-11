import React, { useState } from "react";
import {
  Camera,
  Home,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

function CreateProduct({ isCollapsed }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    delPrice: "",
    rating: "",
    img: "",
    description: "",
    size: "",
    colors: [],
  });

  const [selectedColor, setSelectedColor] = useState("#6366f1");

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD COLOR
  // =========================
  const addColor = () => {
    if (formData.colors.includes(selectedColor)) {
      toast.error("This color is already selected!", {
        position: "top-right",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, selectedColor],
    }));
  };

  // =========================
  // REMOVE COLOR
  // =========================
  const removeColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter(
        (color) => color !== colorToRemove
      ),
    }));
  };

  // =========================
  // SUBMIT PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://smit-ecommerce-website-backend.vercel.app/form/productadd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const text = await response.text();

      console.log("Backend Response:", text);

      if (!response.ok) {
        throw new Error(text);
      }

      toast.success("Product created successfully...", {
        position: "top-right",
        duration: 4000,
      });

      // Reset form
      setFormData({
        name: "",
        price: "",
        delPrice: "",
        rating: "",
        img: "",
        description: "",
        size: "",
        colors: [],
      });

      setSelectedColor("#6366f1");
    } catch (error) {
      console.log("Create Product Error:", error);

      toast.error("Product create nahi hua!", {
        position: "top-right",
      });
    }
  };

  return (
    <div
      className={`${
        isCollapsed
          ? "ml-[80px] w-[calc(100%-80px)]"
          : "ml-[260px] w-[calc(100%-260px)]"
      }`}
    >
      <div className="w-full h-20"></div>

      <div className="min-h-screen bg-[#131930] text-slate-200 font-sans p-6 flex flex-col justify-between">
        <div>
          {/* ================= HEADER ================= */}

          {/* <div className="flex items-center justify-between pb-6">
            <h1 className="text-xl font-semibold text-white">
              Create
            </h1>

            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Home
                size={14}
                className="text-purple-400"
              />

              <ChevronRight size={14} />

              <span className="text-slate-300">
                Product
              </span>

              <ChevronRight size={14} />

              <span className="text-purple-400">
                Create
              </span>
            </div>
          </div> */}

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>
            <div className="bg-[#1a213d] border border-slate-800 rounded-lg p-6 max-w-6xl mx-auto shadow-xl">

              {/* ================= TITLE ================= */}

              <h2 className="text-lg font-semibold text-white mb-6">
                New Product
              </h2>

              {/* ================= PRODUCT PREVIEW ================= */}

              <div className="flex items-center flex-col justify-between bg-[#131930]/40 p-4 rounded-lg border border-slate-800/60 mb-8">

                <div className="flex justify-between w-full">

                  {/* Preview Image */}

                  <div className="flex items-center space-x-4">

                    <div className="w-20 h-20 rounded-lg bg-[#252e4d] flex items-center justify-center text-slate-400 border border-slate-700 overflow-hidden">

                      {formData.img ? (
                        <img
                          src={formData.img}
                          alt="Product Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera size={28} />
                      )}

                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Product Image Preview
                      </h3>

                      <p className="text-xs text-slate-400 mt-1">
                        Enter a live image URL below.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Image URL */}

                <div className="w-full mt-7">

                  <label className="block text-xs ml-1 text-slate-300 mb-1.5 font-medium">
                    Product Image URL
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <input
                    type="url"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder="https://example.com/product.jpg"
                    required
                    className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />

                </div>

              </div>

              {/* ================= PRODUCT INFORMATION ================= */}

              <div className="space-y-4 mb-8">

                <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">
                  Product Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

                  {/* Product Name */}

                  <div>

                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                      Product Name
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                      className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                  </div>

                  {/* Product Price */}

                  <div>

                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                      Product Price
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="2500"
                      min="0"
                      required
                      className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                  </div>

                  {/* Discount Price */}

                  <div>

                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                      Discount Price
                    </label>

                    <input
                      type="number"
                      name="delPrice"
                      value={formData.delPrice}
                      onChange={handleChange}
                      placeholder="3000"
                      min="0"
                      className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                  </div>

                  {/* Rating */}

                  <div>

                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="4.5"
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                  </div>

                </div>

              </div>

              {/* ================= DESCRIPTION ================= */}

              <div className="space-y-4 mb-8">

                <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">
                  Product Description
                </h3>

                <div className="pt-2">

                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description..."
                    className="w-full bg-[#131930] border border-slate-700/70 rounded-md p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  ></textarea>

                </div>

              </div>

              {/* ================= SIZE ================= */}

              <div className="space-y-4 mb-8">

                <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">
                  Product Size
                </h3>

                <div className="pt-2">

                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                    Size
                  </label>

                  <div className="relative">

                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-slate-400 appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >

                      <option
                        value=""
                        disabled
                        hidden
                      >
                        Select Product Size
                      </option>

                      <option
                        value="XS"
                        className="bg-[#131930] text-white"
                      >
                        Extra Small (XS)
                      </option>

                      <option
                        value="S"
                        className="bg-[#131930] text-white"
                      >
                        Small (S)
                      </option>

                      <option
                        value="M"
                        className="bg-[#131930] text-white"
                      >
                        Medium (M)
                      </option>

                      <option
                        value="L"
                        className="bg-[#131930] text-white"
                      >
                        Large (L)
                      </option>

                      <option
                        value="XL"
                        className="bg-[#131930] text-white"
                      >
                        Extra Large (XL)
                      </option>

                      <option
                        value="XXL"
                        className="bg-[#131930] text-white"
                      >
                        Double XL (XXL)
                      </option>

                    </select>

                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-3.5 text-slate-400 pointer-events-none"
                    />

                  </div>

                </div>

              </div>

              {/* ================= COLORS ================= */}

              <div className="space-y-4 mb-8">

                <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">
                  Product Colors
                </h3>

                <div className="pt-2">

                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                    Available Colors
                  </label>

                  <div className="bg-[#131930] border border-slate-700/70 rounded-md p-4">

                    {/* Color Picker */}

                    <div className="flex items-center gap-3">

                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) =>
                          setSelectedColor(e.target.value)
                        }
                        className="w-12 h-10 bg-transparent cursor-pointer border-0"
                      />

                      <span className="text-xs text-slate-400">
                        {selectedColor}
                      </span>

                      <button
                        type="button"
                        onClick={addColor}
                        className="flex items-center gap-2 bg-[#233058] hover:bg-[#2c3d70] text-blue-400 text-xs font-medium px-4 py-2.5 rounded-md border border-blue-500/30 transition-colors"
                      >
                        <Plus size={14} />
                        Add Color
                      </button>

                    </div>

                    {/* Selected Colors */}

                    {formData.colors.length > 0 && (
                      <div className="mt-5">

                        <p className="text-xs text-slate-400 mb-3">
                          Selected Colors
                        </p>

                        <div className="flex flex-wrap gap-3">

                          {formData.colors.map((color) => (

                            <div
                              key={color}
                              className="flex items-center gap-2 bg-[#1a213d] border border-slate-700 rounded-full px-2 py-1.5"
                            >

                              <div
                                className="w-6 h-6 rounded-full border border-slate-500"
                                style={{
                                  backgroundColor: color,
                                }}
                              ></div>

                              <span className="text-xs text-slate-300">
                                {color}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  removeColor(color)
                                }
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={14} />
                              </button>

                            </div>

                          ))}

                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* ================= LIVE PREVIEW ================= */}

              <div className="space-y-4 mb-8">

                <h3 className="text-sm font-semibold text-white border-b border-slate-800/80 pb-3">
                  Product Preview
                </h3>

                <div className="bg-[#131930] border border-slate-700/70 rounded-lg p-5">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Image */}

                    <div className="h-64 rounded-lg bg-[#1a213d] border border-slate-700 flex items-center justify-center overflow-hidden">

                      {formData.img ? (

                        <img
                          src={formData.img}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="text-center text-slate-500">

                          <Camera
                            size={35}
                            className="mx-auto mb-2"
                          />

                          <p className="text-xs">
                            Product Image
                          </p>

                        </div>

                      )}

                    </div>

                    {/* Details */}

                    <div>

                      <p className="text-xs text-slate-500 mb-2">
                        PRODUCT PREVIEW
                      </p>

                      <h2 className="text-2xl font-semibold text-white mb-4">
                        {formData.name || "Product Name"}
                      </h2>

                      <div className="flex items-center gap-3 mb-4">

                        <span className="text-xl font-bold text-white">
                          {formData.price
                            ? `Rs. ${formData.price}`
                            : "Rs. 0"}
                        </span>

                        {formData.delPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            Rs. {formData.delPrice}
                          </span>
                        )}

                      </div>

                      {formData.rating && (
                        <p className="text-sm text-yellow-400 mb-4">
                          ★ {formData.rating} / 5
                        </p>
                      )}

                      {formData.size && (
                        <p className="text-sm text-slate-400 mb-3">
                          Size:{" "}
                          <span className="text-white">
                            {formData.size}
                          </span>
                        </p>
                      )}

                      <p className="text-sm text-slate-400 leading-6">
                        {formData.description ||
                          "Product description will appear here."}
                      </p>

                      {/* Preview Colors */}

                      {formData.colors.length > 0 && (
                        <div className="flex items-center gap-2 mt-5">

                          <span className="text-xs text-slate-400 mr-2">
                            Colors:
                          </span>

                          {formData.colors.map((color) => (

                            <div
                              key={color}
                              className="w-7 h-7 rounded-full border-2 border-slate-500"
                              style={{
                                backgroundColor: color,
                              }}
                            ></div>

                          ))}

                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= ACTIONS ================= */}

              <div className="flex justify-end items-center space-x-4 pt-4 border-t border-slate-800/60">

                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      price: "",
                      delPrice: "",
                      rating: "",
                      img: "",
                      description: "",
                      size: "",
                      colors: [],
                    });

                    setSelectedColor("#6366f1");
                  }}
                  className="text-red-500 hover:text-red-400 text-sm font-medium px-4 py-2 transition-colors"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="bg-[#2a365c] cursor-pointer hover:bg-[#344475] text-slate-300 hover:text-white text-sm font-medium px-5 py-2 rounded-md border border-slate-600/40 transition-colors"
                >
                  Create Product
                </button>

              </div>

            </div>
          </form>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 pt-8 border-t border-slate-800/60 mt-8 max-w-6xl mx-auto w-full">

          <div>
            © All rights reserved{" "}
            <span className="text-purple-400 font-medium cursor-pointer">
              CodedThemes
            </span>
          </div>

          <div className="flex space-x-4 mt-2 md:mt-0">

            <a
              href="#"
              className="hover:text-slate-400"
            >
              License
            </a>

            <a
              href="#"
              className="hover:text-slate-400"
            >
              Hire us
            </a>

            <a
              href="#"
              className="hover:text-slate-400"
            >
              Terms
            </a>

            <a
              href="#"
              className="hover:text-slate-400"
            >
              Figma Design System
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateProduct;
