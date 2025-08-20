import { useContext, useEffect, useState } from "react";
import { useAddCategoreyMutation } from "../api/categoriesApi";
import toast from "react-hot-toast";
import { OureContext } from "../context/gloableContext";
import { FiLoader } from "react-icons/fi";

const AddCategories = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const { addCategoreyForm, setAddCategoreyForm } = useContext(OureContext);
    const [addCategorey ] = useAddCategoreyMutation();
    useEffect(() => {
        setSlug(name.toLocaleLowerCase());
    }, [name])
    const handelAddCategories = async () => {
        setLoading(true);
        try {
            await addCategorey({
                name, 
                slug,
            }).unwrap();
            toast.success('Add Categorey success');
            console.log("New Category:", name);
            setAddCategoreyForm(false);
            setName("");
        }
        catch (error) {
            console.log('Add Categorey Error', error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                addCategoreyForm ? (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value.charAt(0).toLocaleUpperCase() + e.target.value.slice(1))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setAddCategoreyForm(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handelAddCategories}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    {loading ? <FiLoader className="animate-spin mx-auto" size={25} /> : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : ''
            }

        </>
    )
}

export default AddCategories