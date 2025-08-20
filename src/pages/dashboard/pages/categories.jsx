import { useContext } from "react";
import { useCategoires } from "../../../hooks/useCategories";
import { OureContext } from "../../../context/gloableContext";
import AddCategories from "../../../UI/FormAddCetegories";

export default function Categories() {
  const { categories, isLoading, isError } = useCategoires();
  const {setAddCategoreyForm} = useContext(OureContext);

  if (isLoading) return <p className="text-center p-4">Loading categories...</p>;
  if (isError) return <p className="text-center p-4 text-red-500">Error loading categories</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={()=>setAddCategoreyForm(true)}
        >
          + Add Category
        </button>
      </div>
      <AddCategories/>
      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{cat.name}</td>
                  <td className="p-3">{cat.slug}</td>
                  <td className="p-3">{new Date(cat.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <div key={cat.id} className="border rounded-lg p-4 shadow">
              <p className="font-semibold">{index + 1}. {cat.name}</p>
              <p className="text-sm text-gray-600">Slug: {cat.slug}</p>
              <p className="text-xs text-gray-500">Created: {new Date(cat.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories found</p>
        )}
      </div>
    </div>
  );
}