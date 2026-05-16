import React, { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import adminService from "../../services/adminService";

const cardArray = [
  {
    key: "totalProducts",
    title: "Total Products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    key: "totalUsers",
    title: "Total Users",
    icon: Users,
    color: "bg-green-500",
  },
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: ShoppingCart,
    color: "bg-purple-500",
  },
  {
    key: "totalRevenue",
    title: "Revenue",
    icon: DollarSign,
    color: "bg-amber-500",
    isCurrency: true,
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsData();
  }, []);

  const statsData = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardArray.map((card) => {
          let displayValue = stats[card.key];
          if (card.isCurrency) {
            displayValue = `$${displayValue}`;
          }

          return (
            <div
              key={card.title}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                    {displayValue}
                  </p>
                </div>
                <div
                  className={`${card.color} p-3 rounded-full text-white shadow-lg`}
                >
                  <card.icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
