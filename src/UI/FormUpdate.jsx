import { useContext, useState } from "react";
import { useUpdateProductMutation } from "../api/productsApi";
import { uploadImage } from "../utils/uploadeImage";
import { FiLoader } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { OureContext } from "../context/gloableContext";

const FormUpdate = ({ product }) => {
    const [file, setFile] = useState(product.images[0]);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [slug_name, setSlug] = useState(product.slug_name);
    const [loading, setLoading] = useState(false);

    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { openFormUpdate, setOpenFormUpdate  } = useContext(OureContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let imageUrl = file;
            if (file && typeof file !== "string") {
                // إذا اخترنا ملف جديد
                imageUrl = await uploadImage(file);
            }

            await updateProduct({
                id: product.id,
                title,
                price,
                description,
                slug_name,
                images: [imageUrl],
            }).unwrap();

            alert("Product updated successfully!");
            
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Failed to update product");
        } finally {
            setLoading(false);
            setOpenFormUpdate(false)
        }
    };

    return (
        <>
            {
                openFormUpdate ? (
                    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow relative">
                        <CgClose
                            onClick={() => setOpenFormUpdate(!openFormUpdate)}
                            className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            size={20}
                        />
                        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
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
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full"
                            />
                            {file && typeof file === "string" && (
                                <img src={file} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded" />
                            )}
                            <button
                                type="submit"
                                disabled={isLoading || loading}
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex justify-center items-center"
                            >
                                {loading ? <FiLoader className="animate-spin" size={20} /> : "Update Product"}
                            </button>
                        </form>
                    </div>
                ) : (
                    ''
                )
            }
        </>
    );
};

export default FormUpdate;
