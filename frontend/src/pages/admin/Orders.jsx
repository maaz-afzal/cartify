import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await adminService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await adminService.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading)
    return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Orders</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <table className="w-full dark:text-white">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-sm">{order._id.slice(-8)}</td>
                <td className="px-6 py-4 text-sm">
                  {order.userId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.items?.length || 0} items
                </td>
                <td className="px-6 py-4 text-sm font-semibold">
                  ${order.totalPrice}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="px-2 py-1 rounded text-sm border dark:bg-gray-800"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
