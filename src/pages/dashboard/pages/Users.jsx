import {
  useDeleteAccountMutation,
  useGetUsersQuery,
  useUpdateProfileMutation,
} from "../../../api/profileApi";
import { toast } from "react-hot-toast";
import { IoTrashBin, IoSync, IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function Users() {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [deleteAccount, { isLoading: deleting }] = useDeleteAccountMutation();
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteAccount(id).unwrap();
        toast.success("User deleted successfully");
        refetch();
      } catch {
        toast.error(" Failed to delete user");
      }
    }
  };

  const handleChangeRole = async (id, role) => {
    try {
      await updateProfile({ id, data: { role } }).unwrap();
      toast.success("Role updated successfully");
      refetch();
    } catch {
      toast.error(" Failed to update role");
    }
  };

  //  Filtered users
  const filteredUsers = users?.filter(
    (u) =>
      u.display_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading)
    return <p className="text-center"> Loading users...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center"> Failed to fetch users</p>
    );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        👥 Users Management
      </h1>

      {/*  Search Bar */}
      <div className="relative mb-4 max-w-md mx-auto sm:mx-0">
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring focus:ring-indigo-200 text-sm"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse bg-white rounded-lg shadow-md text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr
                key={user.id}
                className="text-center hover:bg-gray-50 transition"
              >
                <td className="p-3 border max-w-[120px] truncate">
                  {user.id}
                </td>
                <td className="p-3 border">{user.display_name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">
                  <select
                    value={user.role || "user"}
                    onChange={(e) =>
                      handleChangeRole(user.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm focus:ring focus:ring-indigo-200"
                    disabled={updating}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3 border flex gap-2 justify-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleting}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {deleting ? (
                      <IoSync className="animate-spin" />
                    ) : (
                      <IoTrashBin />
                    )}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers?.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 border"
          >
            <p className="text-sm text-gray-500">
              <span className="font-semibold">ID:</span> {user.id}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Name:</span>{" "}
              {user.display_name}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <div className="mt-2">
              <label className="font-semibold mr-2">Role:</label>
              <select
                value={user.role || "user"}
                onChange={(e) =>
                  handleChangeRole(user.id, e.target.value)
                }
                className="border rounded px-2 py-1 text-sm focus:ring focus:ring-indigo-200"
                disabled={updating}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deleting}
              className="mt-3 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50 w-full justify-center"
            >
              {deleting ? (
                <IoSync className="animate-spin" />
              ) : (
                <IoTrashBin />
              )}
              Delete
            </button>
          </div>
        ))}
        {filteredUsers?.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}
