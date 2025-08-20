import { useSelector } from "react-redux";
import { useGetOrderQuery } from "../../api/orderApi";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orders = [], isLoading } = useGetOrderQuery();

  if (isLoading) return <div className="text-center py-10">Loading your orders...</div>;

  const userOrders = orders.filter((order) => order.user_id === user?.id);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
      {userOrders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Order #{order.id}</h2>
              <p className="text-gray-600 mb-1"><span className="font-semibold">Status:</span> {order.status}</p>
              <p className="text-gray-600 mb-1"><span className="font-semibold">Total:</span> ${order.price || "0.00"}</p>
              <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
