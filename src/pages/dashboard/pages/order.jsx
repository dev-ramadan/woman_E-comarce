import {  useGetOrderQuery, useUpdateOrderStatusMutation } from "../../../api/orderApi";
import toast from "react-hot-toast";
import "./dashpoard.css";


const Orders = () => {
  const { data: orders, error, isLoading, refetch } = useGetOrderQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error loading orders</p>;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus({ id, status: newStatus }).unwrap();
      toast.success(`Order #${id} updated to ${newStatus}`);
      refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "canceled":
        return "status-canceled";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders Dashboard</h1>

      {/* deskTop  */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr className="orders-thead">
              <th className="orders-th">Order ID</th>
              <th className="orders-th">Customer</th>
              <th className="orders-th">Phone</th>
              <th className="orders-th">Address</th>
              <th className="orders-th">Products</th>
              <th className="orders-th">Qty</th>
              <th className="orders-th">Status</th>
              <th className="orders-th">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="orders-tr">
                <td className="orders-td">{order.id}</td>
                <td className="orders-td font-semibold">{order.fullName}</td>
                <td className="orders-td">{order.phone}</td>
                <td className="orders-td">{order.address}</td>
                <td className="orders-td">
                  <div className="product-images">
                    {order.products.map((item, index) => (
                      <img key={index} src={item.image} alt={item.name} className="product-img" />
                    ))}
                  </div>
                </td>
                <td className="orders-td">
                  <div className="qty-wrapper">
                    {order.products.map((item, index) => (
                      <span key={index}>{item.quantity}</span>
                    ))}
                  </div>
                </td>
                <td className="orders-td">
                  <div className="status-wrapper">
                    <span className={`status-badge ${getStatusClass(order.status || "pending")}`}>
                      {order.status || "Pending"}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </td>
                <td className="orders-td price">${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  mobile */}
      <div className="orders-mobile">
        {orders?.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">#{order.id}</span>
              <span className="order-price">${order.price}</span>
            </div>
            <p className="order-info"><strong>Name:</strong> {order.fullName}</p>
            <p className="order-info"><strong>Phone:</strong> {order.phone}</p>
            <p className="order-info"><strong>Address:</strong> {order.address}</p>
            <div className="order-products">
              {order.products.map((item, index) => (
                <img key={index} src={item.image} alt={item.name} className="product-img" />
              ))}
            </div>
            <div className="order-actions">
              <span className={`status-badge ${getStatusClass(order.status || "pending")}`}>
                {order.status || "Pending"}
              </span>
              <select
                value={order.status || "pending"}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

