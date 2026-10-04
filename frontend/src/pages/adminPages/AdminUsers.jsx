import React, { useEffect, useState } from "react";
import { Search, MoreVertical, Users, CircleUser, User } from "lucide-react";
import api from "../../api/api.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/helpers/Loader.jsx";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");

  const getUsers = async () => {
    const { data } = await api.get("/admin/users");
    return data?.data;
  };

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.username?.toLowerCase().includes(searchValue);

    const matchesRole =
      role === "All Roles" || user.role === role.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm text-text-secondary mb-1">
          Directory
        </p>

        <h1 className="text-2xl font-semibold text-text-primary">
          Users Management
        </h1>

        <p className="text-sm text-text-secondary mt-1">
          Manage customer, seller, and admin accounts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-surface rounded-xl p-5 shadow-sm">
          <p className="text-sm text-text-secondary">
            Total Users
          </p>
          <h2 className="text-2xl font-semibold mt-1">
            {users.length}
          </h2>
        </div>

        <div className="bg-surface rounded-xl p-5 shadow-sm">
          <p className="text-sm text-text-secondary">
            Customers
          </p>
          <h2 className="text-2xl font-semibold mt-1">
            {users.filter((user) => user.role === "customer").length}
          </h2>
        </div>

        <div className="bg-surface rounded-xl p-5 shadow-sm">
          <p className="text-sm text-text-secondary">
            Sellers
          </p>
          <h2 className="text-2xl font-semibold mt-1">
            {users.filter((user) => user.role === "seller").length}
          </h2>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-xl shadow-sm p-5">

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between mb-5">

          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-surface-container-low text-sm focus:outline-none"
          >
            <option>All Roles</option>
            <option>Customer</option>
            <option>Seller</option>
            <option>Admin</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="bg-surface-container-low text-xs uppercase text-text-secondary">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">

              {isLoading ? (
                <tr>
                  <td colSpan="5">
                    <Loader />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-error">
                      <Users size={32} />

                      <p className="text-sm font-medium">
                        Failed to load users
                      </p>

                      <p className="text-xs text-text-secondary">
                        Please try again later.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-surface-container-low/50"
                  >

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-accent-light text-primary flex items-center justify-center overflow-hidden">
                          {
                            user.profile_image ?
                              (<img src={user.profile_image} alt="user-profile" />) :
                              (<User size={20} />)
                          }
                        </div>

                        <div>
                          <p className="font-medium text-sm">
                            {user.fullName}
                          </p>

                          {user.username && (
                            <p className="text-xs text-text-secondary">
                              @{user.username}
                            </p>
                          )}
                        </div>

                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {user.email}
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-accent-light text-primary text-xs capitalize">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/user-detail/${user._id}`)}
                        className="px-3 py-1.5 rounded-lg text-primary hover:bg-accent-light text-xs font-medium transition cursor-pointer"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-sm text-text-secondary"
                  >
                    No users found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminUsers;