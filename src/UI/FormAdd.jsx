import { useContext, useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../api/productsApi";
import { uploadImage } from "../utils/uploadeImage";
import { FiLoader } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { OureContext } from "../context/gloableContext";
import { useCategoires } from "../hooks/useCategories";
import toast from "react-hot-toast";
import "./ui.css"; // ✅ استدعاء ملف CSS الجديد

const Form = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [slug_name, setSlug] = useState("");
  const [category_id, setCategory_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: products = [], refetch } = useGetProductsQuery();
  const { addProductForm, setAddProductForm } = useContext(OureContext);
  const { categories } = useCategoires();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadImage(file);
      }

      await addProduct({
        title,
        price,
        images: [imageUrl],
        description,
        slug_name,
        category_id,
      }).unwrap();

      refetch();
      setTitle("");
      setPrice("");
      setDescription("");
      setSlug("");
      setFile(null);
      toast.success("Product added successfully!");
    } catch (err) {
      console.error("Error adding product :", err);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
      setAddProductForm(false);
    }
  };

  if (!addProductForm) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button */}
        <button
          onClick={() => setAddProductForm(false)}
          className="close-btn"
        >
          <CgClose size={24} />
        </button>

        {/* Title */}
        <h2 className="form-title">Add New Product</h2>
        <p className="form-desc">Fill the form below to add a new product</p>
        <hr className="form-divider" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-field"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-field"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-field"
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={slug_name}
            onChange={(e) => setSlug(e.target.value)}
            className="form-field"
            required
          />

          {/* Category Select */}
          <select
            value={category_id || ""}
            onChange={(e) => setCategory_id(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* File Upload */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || loading}
            className="submit-btn"
          >
            {loading ? <FiLoader className="animate-spin mx-auto" size={25} /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
