import { useState } from "react"
import { useCreatePromoCodeMutation, useDeletePromoCodeMutation } from "../../../api/promoCodeApi"
import { usePromoCode } from "../../../hooks/usePromoCode"
import { IoMdClose } from "react-icons/io"
import toast from "react-hot-toast"

const PromoCode = () => {
    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState("");
    const { promoCode, error, isLoading } = usePromoCode();
    const [deletePromoCode] = useDeletePromoCodeMutation();
    const [createPromoCode] = useCreatePromoCodeMutation();

    const handleAddPromo = async () => {
        if (!promo || !discount) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            await createPromoCode({ promocode: promo, discount }).unwrap();
            toast.success("Promo code added!");
            setPromo("");
            setDiscount("");
        } catch {
            toast.error("Failed to add promo code");
        }
    };

    const handleDeletePromo = async (id) => {
        try {
            await deletePromoCode(id).unwrap();
            toast.success("Promo code deleted!");
        } catch {
            toast.error("Failed to delete promo code");
        }
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading promo codes...</p>;
    if (error) return <p className="text-center text-red-500">Failed to get promo codes.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Promo Codes</h2>

            {/* إضافة بروموكود جديد */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Add New Promo Code</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Promo code"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="md:w-40 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddPromo}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* قائمة البروموكود */}
            <div className="space-y-4">
                {promoCode.length > 0 ? (
                    promoCode.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">
                                    <span className="text-gray-500">Promo:</span> {item.promocode}
                                </p>
                                <span className="text-gray-600">Discount: {item.discount}%</span>
                            </div>
                            <button
                                onClick={() => handleDeletePromo(item.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <IoMdClose size={22} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No promo codes available.</p>
                )}
            </div>
        </div>
    );
}

export default PromoCode;
