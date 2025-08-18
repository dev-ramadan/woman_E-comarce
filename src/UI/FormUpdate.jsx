import { useContext, useState } from "react";
import { useUpdateProductMutation } from "../api/productsApi";
import { uploadImage } from "../utils/uploadeImage";
import { FiLoader } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { OureContext } from "../context/gloableContext";
import toast from "react-hot-toast";
import "./ui.css"; // استدعاء ملف CSS

const FormUpdate = ({ product }) => {
    const [file, setFile] = useState(product.images[0]);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [slug_name, setSlug] = useState(product.slug_name);
    const [loading, setLoading] = useState(false);

    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { openFormUpdate, setOpenFormUpdate } = useContext(OureContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let imageUrl = file;
            if (file && typeof file !== "string") {
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

            toast.success('Product updated successfully!');
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
            setOpenFormUpdate(false);
        }
    };

    return (
        <>
            {openFormUpdate && (
                <div className="form-overlay">
                    <div className="form-container">
                        <button
                            onClick={() => setOpenFormUpdate(false)}
                            className="close-btn"
                        >
                            <CgClose size={24} />
                        </button>

                        <h2 className="form-title">Update Product</h2>
                        <hr className="form-divider" />

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-input"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-input"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="form-input"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Slug"
                                value={slug_name}
                                onChange={(e) => setSlug(e.target.value)}
                                className="form-input"
                                required
                            />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="file-input"
                            />
                            {file && typeof file === "string" && (
                                <img src={file} alt="Preview" className="preview-img" />
                            )}
                            <button
                                type="submit"
                                disabled={isLoading || loading}
                                className={`submit-btn ${loading ? "submit-btn-disabled" : ""}`}
                            >
                                {loading ? <FiLoader className="animate-spin" size={20} /> : "Update Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormUpdate;
