import { useState } from "react"
import { useCreatePromoCodeMutation, useDeletePromoCodeMutation } from "../../../api/promoCodeApi"
import { usePromoCode } from "../../../hooks/usePromoCode"
import './dashpoard.css'
import { IoMdClose } from "react-icons/io"
import toast from "react-hot-toast"
const PromoCode = () => {
    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState("");
    const { promoCode, error, isLoading } = usePromoCode();
    const [deletePromoCode] = useDeletePromoCodeMutation();
    const [createPromoCode] = useCreatePromoCodeMutation()
    error ? <p>FAILD TO GET PROMOCODE</p> : ''
    isLoading ? <p>LOADING..</p> : ''

    const handleAddPromo = async () => {
        if (!promo || !discount) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            await createPromoCode({ promocode:promo, discount }).unwrap();
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

    if (isLoading) return <p>Loading promo codes...</p>;


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Promo Codes</h2>

                        {/* إضافة بروموكود جديد */}
            <div className="mb-5 border-b-2 p-2">
                <h3 className="text-lg font-semibold mb-2">Add New Promo Code</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Promo code"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-32 border rounded-lg px-3 py-2"
                    />
                    <button
                        onClick={handleAddPromo}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* قائمة البروموكود */}
            <div className="space-y-3 mb-6">
                {promoCode.length > 0 ? (
                    promoCode.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
                        >
                            <div>
                                <p className="font-semibold"><span className="text-gray-500">Promo:</span> {item.promocode}</p>
                                <span className="text-gray-500">Discount: {item.discount}</span>
                            </div>
                            <button
                                onClick={() => handleDeletePromo(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No promo codes available.</p>
                )}
            </div>


        </div>
    );
}
export default PromoCode