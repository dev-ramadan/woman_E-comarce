import { useContext, useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../api/productsApi";
import { uploadImage } from "../utils/uploadeImage";
import { FiLoader } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { OureContext } from "../context/gloableContext";
import { useCategoires } from "../hooks/useCategories";

const Form = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [slug_name, setSlug] = useState("");
  const [category_id, setCategory_id] = useState(null)
  const [loading, setLoading] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: products = [], refetch } = useGetProductsQuery();
  const { addProductForm, setAddProductForm } = useContext(OureContext);
  const { categories } = useCategoires()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
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
        category_id ,
      }).unwrap();
      console.log(imageUrl);

      refetch();

      setTitle("");
      setPrice("");
      setDescription("");
      setSlug("");
      setFile(null);

      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setLoading(false)
      setAddProductForm(false)
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <CgClose onClick={() => setAddProductForm(!addProductForm)} className="cursor-pointer mb-3" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug_name}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Select menu للفئة */}
        <select
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>



        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? <FiLoader className='animate-spin mx-auto' size={25} /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Form;
