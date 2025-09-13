import { useState, useEffect } from "react";
import { FiEdit3, FiUpload, FiSave } from "react-icons/fi";
import { useGetAllSectionQuery, useUpdateSectionMutation } from "../../../api/sectionApi";
import { uploadSectionImage } from "../../../utils/upladeSectionImage";
import DynamicIcon from "../../../utils/dynamicIcon";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const SectionManager = () => {
  const { data: sections, isLoading } = useGetAllSectionQuery();
  const [updateSection] = useUpdateSectionMutation();

  const [selectedSection, setSelectedSection] = useState(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image_url: "", icon: "", button_text: "" });
  const [loading, setLoading] = useState(false);

  // Group sections by type
  const grouped = sections?.reduce((acc, section) => {
    if (!acc[section.type]) acc[section.type] = [];
    acc[section.type].push(section);
    return acc;
  }, {}) || {};

  // Load selected section into form
  useEffect(() => {
    if (selectedSection) {
      setForm({
        title: selectedSection.title || "",
        subtitle: selectedSection.subtitle || "",
        image_url: selectedSection.image_url || "",
        button_text: selectedSection.button_text || "",
        icon: selectedSection.icon || "",

      });
    }
  }, [selectedSection]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const imageUrl = await uploadSectionImage(file);
      setForm((prev) => ({ ...prev, image_url: imageUrl }));
    } catch (error) {
      toast.error("Failed to upload image");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSection) return;

    setLoading(true);
    try {
      await updateSection({ id: selectedSection.id, data: form }).unwrap();
      toast.success("Section updated successfully");
      setSelectedSection(null); // close modal
    } catch (error) {
      toast.error("Failed to update section");
    }
    setLoading(false);
  };

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading sections...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Dashboard - Manage Sections
        </h1>

        {/* Show grouped sections */}
        {Object.keys(grouped).map((type) => (
          <div key={type} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{type}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[type].map((s) => (
                <div
                  key={s.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-xl transition"
                >
                  {s.image_url ? (
                    <img
                      src={s.image_url}
                      alt={s.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <DynamicIcon name={s.icon} size={40} className="mx-auto mt-2" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {s.title || "No title"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{s.subtitle}</p>
                    <button
                      onClick={() => setSelectedSection(s)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FiEdit3 /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative h-96 overflow-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedSection(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Edit Section: {selectedSection.title || "No title"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image || icon */}
              {form.icon ? (
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Icon <a href="https://react-icons.github.io/react-icons/search/" target="_blank" className=" font-sm text-blue-400 underline ml-2">Search Here</a>
                  </label>
                  <input
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter the title here"
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                      <FiUpload /> Select Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {loading && (
                      <span className="text-sm text-gray-500">Uploading...</span>
                    )}
                  </div>

                  {form.image_url && (
                    <div className="mt-4">
                      <img
                        src={form.image_url}
                        alt="preview"
                        className="w-full max-h-60 object-cover rounded-lg border"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              )
              }



              {/* Title */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter the title here"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  rows="5"
                  className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  placeholder="Enter the description here"
                />
              </div>

              {/* link text */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  name="button_text"
                  value={form.button_text}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter the title here"
                />
              </div>

              {/* Save button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <FiSave />{" "}
                  {loading ? (
                    <span className="animate-spin">
                      <CgSpinner />
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionManager;
