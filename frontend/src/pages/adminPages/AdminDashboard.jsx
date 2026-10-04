import { useEffect } from 'react';
import api from '../../api/api.js'
import {
  Package,
  ShoppingCart,
  Users,
  Store,
  TrendingUp,
} from "lucide-react";
import { useState } from 'react';
import DashboardStatCards from '../../components/admin/DashboardStatCards.jsx';

const recentOrders = [
  {
    id: "#ORD-9844",
    customer: "Sarah Jenkins",
    initials: "SJ",
    amount: "$149.00",
    status: "Pending",
    date: "May 28, 2025",
  },
  {
    id: "#ORD-9843",
    customer: "David Miller",
    initials: "DM",
    amount: "$89.00",
    status: "Processing",
    date: "May 28, 2025",
  },
  {
    id: "#ORD-9842",
    customer: "Elena Morales",
    initials: "EM",
    amount: "$249.00",
    status: "Shipped",
    date: "May 27, 2025",
  },
  {
    id: "#ORD-9841",
    customer: "Alex Rivera",
    initials: "AR",
    amount: "$42.00",
    status: "Delivered",
    date: "May 27, 2025",
  },
  {
    id: "#ORD-9840",
    customer: "Chloe Martin",
    initials: "CM",
    amount: "$799.00",
    status: "Cancelled",
    date: "May 26, 2025",
  },
];

const statusStyles = {
  Pending: "bg-[#FFF4D6] text-[#C58A28]",
  Processing: "bg-[#E6F7F9] text-[#006671]",
  Shipped: "bg-[#F3E8DF] text-[#954518]",
  Delivered: "bg-[#E7F5EE] text-success",
  Cancelled: "bg-[#FDECEC] text-[#C94A4A]",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({})

  const getStats = async()=>{    
    try {
      const res = await api.get("/admin/dashboard-stats")
      if(res.data?.success){
        setStats(res.data.data)
      }
    } catch (error) {
      console.log(error);
    } finally{
    }
  }
  
  useEffect(()=>{
    getStats()
  },[])
  
  return (
    <div className="flex w-full flex-col gap-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
          Overview
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCards
          title="Total Products"
          Icon = {Package}
          value={stats.totalProducts || 0}
          change="12"
          period="this month"
        />
        <DashboardStatCards
          title="Total Orders"
          Icon = {ShoppingCart}
          value={stats.totalOrders || 0}
          change="+8.5%"
          period="this month"
        />
        <DashboardStatCards
          title="Total Users"
          Icon = {Users}
          value={stats.totalUsers}
          change="+8.5%"
          period="this month"
        />
        <DashboardStatCards
          title="Total Sellers"
          Icon = {Store}
          value={stats.totalSellers}
          change="+5%"
          period="this week"
        />
      </div>

      {/* Sales Overview */}
      <div className="rounded-xl border border-border bg-white p-6">
        <div>
          <h2 className="text-lg font-semibold text-[#171717]">
            Sales Overview
          </h2>

          <p className="mt-1 text-xs text-text-secondary">
            Monthly sales performance
          </p>
        </div>

        <div className="mt-5 flex items-end gap-3">
          <span className="text-2xl font-semibold text-[#171717]">
            $184,320
          </span>

          <span className="mb-0.5 text-xs font-semibold text-success">
            +18.4%
          </span>
        </div>

        {/* Simple Chart */}
        <div className="mt-6 h-64 w-full">
          <svg
            viewBox="0 0 800 240"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            {/* Grid Lines */}
            <line
              x1="0"
              y1="40"
              x2="800"
              y2="40"
              stroke="#F0EDED"
              strokeDasharray="4 4"
            />

            <line
              x1="0"
              y1="100"
              x2="800"
              y2="100"
              stroke="#F0EDED"
              strokeDasharray="4 4"
            />

            <line
              x1="0"
              y1="160"
              x2="800"
              y2="160"
              stroke="#F0EDED"
              strokeDasharray="4 4"
            />

            <line
              x1="0"
              y1="210"
              x2="800"
              y2="210"
              stroke="#F0EDED"
            />

            {/* Area */}
            <path
              d="
                M 0 170
                C 80 160, 100 135, 160 140
                C 220 145, 260 90, 320 85
                C 380 80, 420 115, 480 100
                C 540 85, 580 45, 640 40
                C 700 35, 740 60, 800 25
                L 800 210
                L 0 210
                Z
              "
              fill="#954518"
              fillOpacity="0.08"
            />

            {/* Line */}
            <path
              d="
                M 0 170
                C 80 160, 100 135, 160 140
                C 220 145, 260 90, 320 85
                C 380 80, 420 115, 480 100
                C 540 85, 580 45, 640 40
                C 700 35, 740 60, 800 25
              "
              fill="none"
              stroke="#954518"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Data Points */}
            <circle
              cx="160"
              cy="140"
              r="4"
              fill="white"
              stroke="#954518"
              strokeWidth="2"
            />

            <circle
              cx="320"
              cy="85"
              r="4"
              fill="white"
              stroke="#954518"
              strokeWidth="2"
            />

            <circle
              cx="480"
              cy="100"
              r="4"
              fill="white"
              stroke="#954518"
              strokeWidth="2"
            />

            <circle
              cx="640"
              cy="40"
              r="4"
              fill="white"
              stroke="#954518"
              strokeWidth="2"
            />

            <circle
              cx="800"
              cy="25"
              r="5"
              fill="#954518"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          {/* Months */}
          <div className="flex justify-between px-1 text-xs text-text-secondary">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-text-secondary">
              Latest orders from your customers
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-[#954518] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-y border-border bg-[#F6F3F2]">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Order ID
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Customer
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Amount
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Status
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-b-0 hover:bg-background"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#171717]">
                    {order.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E8DF] text-xs font-semibold text-[#954518]">
                        {order.initials}
                      </div>

                      <span className="text-sm text-[#171717]">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-[#171717]">
                    {order.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#F6F3F2]/50 px-6 py-3 text-xs text-text-secondary">
          Showing 5 recent orders
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;