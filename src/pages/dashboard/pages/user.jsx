import { useGetUsersQuery } from "../../../api/profileApi";

export default function Users() {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading users</p>;

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.display_name || 'N/A'}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
