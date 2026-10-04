import React, { useState } from "react";
import { Search, ChevronDown, MoreVertical, Package, Package2 } from "lucide-react";
import SellerStatCard from "../../components/admin/SellerStatCard";
import SellerRow from "../../components/admin/SellerRow";
import api from '../../api/api.js'
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/helpers/Loader.jsx";

const statusTabs = ["All", "Pending", "Suspended"];

function AdminSellers() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");


  const getSellers = async () => {
    const { data } = await api.get("/admin/sellers")
    return data.data;
  }

  const { data = {}, isLoading, isError } = useQuery({
    queryKey: ["sellers"],
    queryFn: getSellers
  })

  const approvedSellersData = data?.approvedSellers || [];
  const pendingSellersData = data?.pendingSellers || [];

  const totalSellers = [...approvedSellersData, ...pendingSellersData].length;
  const activeSellers = approvedSellersData.length;
  const pendingSellers = pendingSellersData.length;
  const suspendedSellers = 0;

  const sellers =
    activeTab === "Active"
      ? approvedSellersData
      : activeTab === "Pending"
        ? pendingSellersData
        : activeTab === "All"
          ? [...approvedSellersData, ...pendingSellersData]
          : [];

  const filteredSellers = sellers.filter((seller) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      seller.storeName?.toLowerCase().includes(searchValue) ||
      seller.city?.toLowerCase().includes(searchValue);

    const matchesCategory =
      category === "All Categories" ||
      seller.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <p className="text-sm text-text-secondary">
          Console <span className="mx-1">›</span>{" "}
          <span className="text-primary">Sellers</span>
        </p>

        <h1 className="text-3xl font-semibold text-text-primary tracking-tight">
          Sellers
        </h1>

        <p className="text-sm text-text-secondary">
          Manage marketplace sellers and review seller applications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SellerStatCard
          title="Total Sellers"
          value={activeSellers}
          description="All registered sellers"
        />

        <SellerStatCard
          title="Active Sellers"
          value={activeSellers}
          description="Currently active"
        />

        <SellerStatCard
          title="Pending Approval"
          value={pendingSellers}
          description="Requires review"
          warning
        />

        <SellerStatCard
          title="Suspended"
          value={suspendedSellers}
          description="Currently suspended"
          danger
        />
      </div>

      {/* Sellers Section */}
      <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {statusTabs.map((tab) => {
                const count =
                  tab === "All"
                    ? totalSellers
                    : tab === "Active"
                      ? activeSellers
                      : tab === "Pending"
                        ? pendingSellers
                        : suspendedSellers;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition ${activeTab === tab
                      ? "bg-accent-light text-primary"
                      : "bg-surface-container-low text-text-secondary hover:text-text-primary"
                      }`}
                  >
                    {tab}
                    <span className="ml-1.5 opacity-70">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search + Category */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                />

                <input
                  type="text"
                  placeholder="Search sellers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-72 pl-9 pr-4 py-2.5 rounded-lg bg-surface-container-low text-sm text-text-primary placeholder:text-text-secondary outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full sm:w-44 px-3 py-2.5 pr-9 rounded-lg bg-surface-container-low text-sm text-text-primary outline-none cursor-pointer"
                >
                  <option>All Categories</option>
                  <option>Fashion & Apparel</option>
                  <option>Home & Living</option>
                  <option>Electronics</option>
                  <option>Beauty & Wellness</option>
                  <option>Artisan Ceramics</option>
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-text-secondary text-xs uppercase tracking-wider">
                <th className="px-5 py-3.5 font-medium">
                  Seller / Store
                </th>

                <th className="px-5 py-3.5 font-medium">
                  Category
                </th>

                <th className="px-5 py-3.5 font-medium text-right">
                  Products
                </th>

                <th className="px-5 py-3.5 font-medium text-center">
                  Status
                </th>

                <th className="px-5 py-3.5 font-medium">
                  Joined
                </th>

                <th className="px-5 py-3.5 font-medium text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-error">
                      <Package size={32} />

                      <p className="text-sm font-medium">
                        Failed to load sellers
                      </p>

                      <p className="text-xs text-text-secondary">
                        Please try again later.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredSellers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-text-secondary">
                      <Package size={32} />

                      <p className="text-sm font-medium">
                        No sellers found
                      </p>

                      <p className="text-xs">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSellers.map((seller) => (
                  <SellerRow
                    key={seller._id}
                    seller={seller}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-border text-sm text-text-secondary">
          <span>
            Showing{" "}
            <strong className="text-text-primary font-medium">
              {filteredSellers.length}
            </strong>{" "}
            of{" "}
            <strong className="text-text-primary font-medium">
              {totalSellers}
            </strong>{" "}
            sellers
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled
              className="px-3 py-1.5 rounded-lg text-xs font-medium opacity-40 cursor-not-allowed"
            >
              Previous
            </button>

            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-xs font-medium">
              1
            </button>

            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-xs font-medium">
              2
            </button>

            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-xs font-medium">
              3
            </button>

            <span className="px-1">...</span>

            <button className="px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-xs font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSellers;