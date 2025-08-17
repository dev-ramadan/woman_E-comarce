// src/components/MyModalTailwind.jsx
import { useContext, useState } from "react";
import { OureContext } from "../context/gloableContext";
import { useDeleteProductMutation } from "../api/productsApi";
import { FiLoader } from "react-icons/fi";

export default function Modal() {
    const { deleteDialog, setDeleteDialog } = useContext(OureContext);
    const [deleteProduct] = useDeleteProductMutation()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteProduct(deleteDialog.id).unwrap();
            setDeleteDialog({ open: false, id: null });
            setDeleteDialog({ open: false });

        } catch (error) {
            console.error("Failed to delete:", error);
        } finally {
            setLoading(false)
        }
    };

    if (!deleteDialog.open) return null;

    const close = () => setDeleteDialog({ open: false });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <h3 className="text-xl font-bold text-red-500">DELETE PRODUCT</h3>
                <p className="mt-2 text-gray-600">
                    Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={close}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Cancle
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-500"
                    >
                        {loading ? <FiLoader className='animate-spin mx-auto' size={25} /> : "Delete"}
                    </button>
                </div>


            </div>
        </div>
    );
}
