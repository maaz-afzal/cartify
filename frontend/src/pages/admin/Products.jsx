import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import adminService from "../../services/adminService";
import ToastNotification from "../../components/ToastNotification";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState("");

  const initialFormState = {
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    images: [""],
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await adminService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, formData);
        setToast("Product updated successfully!");
      } else {
        await adminService.addProduct(formData);
        setToast("Product added successfully!");
      }
      loadProducts();
      closeModal();
    } catch (error) {
      setToast("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminService.deleteProduct(id);
        setToast("Product deleted successfully!");
        loadProducts();
      } catch (error) {
        setToast("Failed to delete the product");
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
      images: product.images || [""],
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(initialFormState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: [e.target.value] }));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading products...</div>
    );
  }

  return (
    <div className="p-4">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products
        </h1>
        <button
          onClick={openAddModal}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/40"
                        }
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                rows="3"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.images[0]}
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex-1 font-medium"
                >
                  {editingProduct ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
