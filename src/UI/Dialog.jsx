import { useContext, useState } from "react";
import { OureContext } from "../context/gloableContext";
import { useDeleteProductMutation } from "../api/productsApi";
import { FiLoader } from "react-icons/fi";
import "./ui.css";

export default function Modal() {
  const { deleteDialog, setDeleteDialog } = useContext(OureContext);
  const [deleteProduct] = useDeleteProductMutation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(deleteDialog.id).unwrap();
      setDeleteDialog({ open: false, id: null });
      setDeleteDialog({ open: false });
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!deleteDialog.open) return null;

  const close = () => setDeleteDialog({ open: false });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">DELETE PRODUCT</h3>
        <p className="modal-description">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button onClick={close} className="modal-btn-cancel">
            Cancel
          </button>

          <button onClick={handleDelete} className="modal-btn-delete">
            {loading ? <FiLoader className="modal-loader" size={25} /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
