import React, { useState, useEffect } from "react";
import {
    Search,
    Download,
    Plus,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Star,
    Edit,
    Trash2
} from "lucide-react";
import toast from "react-hot-toast";

const ViewProduct = ({ isCollapsed }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editProduct, setEditProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Products From Backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://smit-ecommerce-website-backend.vercel.app/form/product"
                );

                const data = await response.json();

                console.log("DATA:", data);
                console.log("IS ARRAY:", Array.isArray(data));
                console.log("DATA.PRODUCTS:", data.products);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch products");
                }

                // Agar backend direct array return kare
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    // Agar backend { products: [] } return kare
                    setProducts(data.product || []);
                }
            } catch (error) {
                console.log("Fetch Products Error:", error);
            } finally {
                setLoading(false);
            }
        };
        console.log(products)
        fetchProducts();
    }, []);

    // Select All
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(products.map((product) => product._id));
        } else {
            setSelectedRows([]);
        }
    };

    // Select Single Row
    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(
                selectedRows.filter((rowId) => rowId !== id)
            );
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    // Search Filter
    const filteredProducts = products.filter((product) =>
        `${product.name} ${product.description || ""} ${product.size || ""}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    //   Delete Product Functionality ha ya
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `https://smit-ecommerce-website-backend.vercel.app/form/product/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete product");
            }

            // Product ko UI se remove karo
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );

            console.log(data.message);

        } catch (error) {
            console.log("Delete Product Error:", error);
        }
    };
    
    const handleUpdateProduct = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `https://smit-ecommerce-website-backend.vercel.app/product/${editProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProduct),
    }
);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Product update failed");
    }
    
    // Updated product ko state mein update karo
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product._id === editProduct._id
    ? data.product
    : product
)
);

toast.success("Product Updated Successfully")

    setShowEditModal(false);
    setEditProduct(null);

  } catch (error) {
    console.log("Update Product Error:", error);
  }
};

    return (
        <div
            className={`transition-all duration-300 ${isCollapsed
                    ? "ml-[80px] mt-[80px] w-[calc(100%-80px)]"
                    : "ml-[260px] mt-[70px] w-[calc(100%-260px)]"
                }`}
        >
            <div className="min-h-screen bg-[#131930] text-slate-200 font-sans p-6 flex flex-col justify-between">

                <div>

                    {/* Table Container */}
                    <div className="bg-[#1a213d] border border-slate-800 rounded-lg p-5 max-w-7xl mx-auto shadow-xl">

                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">

                            {/* Search */}
                            <div className="relative w-full sm:w-64">

                                <Search
                                    size={16}
                                    className="absolute left-3 top-2.5 text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search product..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full bg-[#131930] border border-slate-700/60 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                />

                            </div>

                            {/* Buttons */}
                            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">

                                <button
                                    className="flex items-center space-x-1.5 bg-[#1e2a4a] hover:bg-[#25355e] text-blue-400 border border-blue-500/30 text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors"
                                >
                                    <Download size={14} />
                                    <span>Download</span>
                                </button>

                                <button
                                    className="flex items-center space-x-1.5 bg-[#1d70f5] hover:bg-[#1660d6] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors"
                                >
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
                                                    selectedRows.length === products.length &&
                                                    products.length > 0
                                                }
                                                className="rounded bg-[#131930] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600"
                                            />

                                        </th>

                                        <th className="py-3 px-3">
                                            Product
                                        </th>

                                        <th className="py-3 px-3">
                                            Price
                                        </th>

                                        <th className="py-3 px-3">
                                            Discount Price
                                        </th>

                                        <th className="py-3 px-3">
                                            Rating
                                        </th>

                                        <th className="py-3 px-3">
                                            Size
                                        </th>

                                        <th className="py-3 px-3">
                                            Colors
                                        </th>

                                        <th className="py-3 px-3">
                                            Status
                                        </th>

                                        <th className="py-3 px-3 text-center">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-800/50 text-xs">

                                    {/* Loading */}
                                    {loading ? (

                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="py-8 text-center text-slate-400"
                                            >
                                                Loading products...
                                            </td>
                                        </tr>

                                    ) : filteredProducts.length === 0 ? (

                                        /* No Products */
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="py-8 text-center text-slate-400"
                                            >
                                                No products found
                                            </td>
                                        </tr>

                                    ) : (

                                        /* Products */
                                        filteredProducts.map((product) => (

                                            <tr
                                                key={product._id}
                                                className="hover:bg-[#151c35] transition-colors"
                                            >

                                                {/* Checkbox */}
                                                <td className="py-3.5 px-3">

                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(
                                                            product._id
                                                        )}
                                                        onChange={() =>
                                                            handleSelectRow(product._id)
                                                        }
                                                        className="rounded bg-[#131930] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600"
                                                    />

                                                </td>


                                                {/* Product */}
                                                <td className="py-3.5 px-3">

                                                    <div className="flex items-center space-x-3">

                                                        <img
                                                            src={product.img}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-md object-cover border border-slate-700"
                                                            onError={(e) => {
                                                                e.target.style.display = "none";
                                                            }}
                                                        />

                                                        <div>

                                                            <div className="font-semibold text-white text-xs">
                                                                {product.name}
                                                            </div>

                                                            <div className="text-[11px] text-slate-400 max-w-[180px] truncate">
                                                                {product.description ||
                                                                    "No description"}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Price */}
                                                <td className="py-3.5 px-3">

                                                    <span className="text-white font-semibold">
                                                        Rs. {product.price}
                                                    </span>

                                                </td>


                                                {/* Discount Price */}
                                                <td className="py-3.5 px-3">

                                                    {product.delPrice ? (

                                                        <span className="text-slate-400 line-through">
                                                            Rs. {product.delPrice}
                                                        </span>

                                                    ) : (

                                                        <span className="text-slate-500">
                                                            -
                                                        </span>

                                                    )}

                                                </td>


                                                {/* Rating */}
                                                <td className="py-3.5 px-3">

                                                    <div className="flex items-center space-x-1">

                                                        <Star
                                                            size={13}
                                                            className="text-yellow-400 fill-yellow-400"
                                                        />

                                                        <span className="text-yellow-400">
                                                            {product.rating || 0}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Size */}
                                                <td className="py-3.5 px-3">

                                                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-950/50 text-purple-400 border border-purple-800/40">
                                                        {product.size || "N/A"}
                                                    </span>

                                                </td>


                                                {/* Colors */}
                                                <td className="py-3.5 px-3">

                                                    <div className="flex items-center space-x-1.5">

                                                        {product.colors &&
                                                            product.colors.length > 0 ? (

                                                            product.colors
                                                                .slice(0, 5)
                                                                .map((color, index) => (

                                                                    <div
                                                                        key={index}
                                                                        title={color}
                                                                        className="w-5 h-5 rounded-full border border-slate-500"
                                                                        style={{
                                                                            backgroundColor: color,
                                                                        }}
                                                                    ></div>

                                                                ))

                                                        ) : (

                                                            <span className="text-slate-500">
                                                                No colors
                                                            </span>

                                                        )}

                                                    </div>

                                                </td>


                                                {/* Status */}
                                                <td className="py-3.5 px-3">

                                                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                                                        Active
                                                    </span>

                                                </td>


                                                {/* Action */}
                                                <td className="py-3.5 px-3 text-center">

                                                    <td className="py-3.5 px-3">

                                                        <div className="flex items-center justify-center gap-2">

                                                            {/* Edit */}
                                        <button
                                        onClick={() => {
                                            setEditProduct(product);
                                            setShowEditModal(true);
                                        }}
                                        className="flex items-center gap-1.5 bg-[#1e2a4a] hover:bg-[#25355e] text-blue-400 border border-blue-500/30 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
                                        >
                                        <Edit size={13} />
                                        Edit
                                        </button>


                                                            {/* Delete */}
                                                            <button
                                                                onClick={() => handleDelete(product._id)}
                                                                className="flex items-center gap-1.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
                                                            >
                                                                <Trash2 size={13} />
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-6 pt-4 text-xs text-slate-400">

                            {/* Rows */}
                            <div className="flex items-center space-x-2">

                                <span>
                                    Rows per page:
                                </span>

                                <div className="relative">

                                    <select
                                        value={rowsPerPage}
                                        onChange={(e) =>
                                            setRowsPerPage(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="bg-[#131930] border border-slate-700/60 rounded px-2 py-1 pr-6 text-white appearance-none focus:outline-none cursor-pointer"
                                    >

                                        <option value={10}>
                                            10
                                        </option>

                                        <option value={20}>
                                            20
                                        </option>

                                        <option value={50}>
                                            50
                                        </option>

                                    </select>

                                    <ChevronDown
                                        size={12}
                                        className="absolute right-1.5 top-2 text-slate-400 pointer-events-none"
                                    />

                                </div>

                            </div>


                            {/* Count */}
                            <div>

                                {filteredProducts.length > 0
                                    ? `1–${filteredProducts.length} of ${filteredProducts.length}`
                                    : "0 of 0"}

                            </div>


                            {/* Arrows */}
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
            {showEditModal && editProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1a213d] border border-slate-700 rounded-lg shadow-2xl">

      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Edit Product
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Update product information
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowEditModal(false);
            setEditProduct(null);
          }}
          className="text-slate-400 hover:text-white text-xl"
        >
          ×
        </button>

      </div>


      {/* Form */}
      <form
        onSubmit={handleUpdateProduct}
        className="p-6 space-y-5"
      >

        {/* Product Name */}
        <div>
          <label className="block text-xs text-slate-300 mb-1.5">
            Product Name
          </label>

          <input
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                name: e.target.value,
              })
            }
            required
            className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>


        {/* Price + Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Product Price
            </label>

            <input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: e.target.value,
                })
              }
              required
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Discount Price
            </label>

            <input
              type="number"
              value={editProduct.delPrice || ""}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  delPrice: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* Rating + Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Rating
            </label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={editProduct.rating || ""}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  rating: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-xs text-slate-300 mb-1.5">
              Size
            </label>

            <select
              value={editProduct.size || ""}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  size: e.target.value,
                })
              }
              className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

        </div>


        {/* Image URL */}
        <div>
          <label className="block text-xs text-slate-300 mb-1.5">
            Product Image URL
          </label>

          <input
            type="url"
            value={editProduct.img || ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                img: e.target.value,
              })
            }
            className="w-full bg-[#131930] border border-slate-700/70 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
          />

          {editProduct.img && (
            <img
              src={editProduct.img}
              alt="Preview"
              className="mt-3 w-20 h-20 rounded-md object-cover border border-slate-700"
            />
          )}
        </div>


        {/* Description */}
        <div>
          <label className="block text-xs text-slate-300 mb-1.5">
            Description
          </label>

          <textarea
            rows="4"
            value={editProduct.description || ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description: e.target.value,
              })
            }
            className="w-full bg-[#131930] border border-slate-700/70 rounded-md p-3.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>


        {/* Colors */}
        <div>
          <label className="block text-xs text-slate-300 mb-2">
            Colors
          </label>

          <div className="flex flex-wrap gap-2">

            {(editProduct.colors || []).map((color, index) => (

              <div
                key={index}
                className="flex items-center gap-2 bg-[#131930] border border-slate-700 rounded-full px-2 py-1"
              >

                <div
                  className="w-6 h-6 rounded-full border border-slate-500"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <span className="text-xs text-slate-300">
                  {color}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">

          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditProduct(null);
            }}
            className="text-red-400 hover:text-red-300 text-sm px-4 py-2"
          >
            Cancel
          </button>


          <button
            type="submit"
            className="bg-[#2a365c] hover:bg-[#344475] text-white text-sm font-medium px-5 py-2 rounded-md border border-slate-600/40"
          >
            Update Product
          </button>

        </div>

      </form>

    </div>

  </div>
)}                                    
        </div>
    );
};

export default ViewProduct;
