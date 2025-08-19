import { useContext } from "react"
import { OureContext } from "../context/gloableContext"
import { useAddToCart } from "../utils/addTocart";

const SelectQuantity = (  ) => {
    const { quantityDialog, setQuantityDialog ,selectQuantity ,setSelectQuantity , currentProductId } = useContext(OureContext);
    const {handelAdd} = useAddToCart();
    return (
        <>
            {
                quantityDialog ? (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto shadow-lg relative">
                            <h2 className="text-xl font-bold mb-4">Select Quantity</h2>
                            <input
                                type="number"
                                min="1"
                                value={selectQuantity}
                                onChange={(e) => setSelectQuantity(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setQuantityDialog(false)}
                                    className="px-4 py-2 rounded border hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={()=>handelAdd(currentProductId)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                            <button
                                onClick={() => setQuantityDialog(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg font-bold"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ): (
                    ''
                )
        }
        </>
    )
}
export default SelectQuantity