import { useEffect, useState } from "react";
import API from "../api/axios";
import type { Lead } from "../types/lead";
import { useAuth } from "../context/AuthContext";

import debounce from "lodash.debounce";

import { CSVLink } from "react-csv";

import {
  LayoutDashboard,
  Users,
  LogOut,
  Download,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const AdminDashboard = () => {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [search, setSearch] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedLeadId, setSelectedLeadId] =
    useState<string | null>(null);

const [sidebarOpen, setSidebarOpen] =
  useState(false);
  const { user, logout } =
    useAuth();

  /* Force Light Mode */

  useEffect(() => {
    document.documentElement.classList.remove(
      "dark"
    );

    localStorage.removeItem("theme");
  }, []);

  /* Fetch Leads */

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/leads",
        {
          params: {
            page,
            status,
            source,
            search,
            sort,
          },
        }
      );

      setLeads(res.data.data);

      setTotalPages(
        res.data.pagination.totalPages
      );
    } catch (error) {
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, status, source, sort, search]);

  /* Search */

  const debouncedSearch = useState(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500)
  )[0];

  /* Delete */

  const handleDelete = async () => {
    if (!selectedLeadId) return;

    try {
      await API.delete(
        `/leads/${selectedLeadId}`
      );

      fetchLeads();

      setDeleteModal(false);

      setSelectedLeadId(null);
    } catch (error) {
      console.error(error);

      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-24"
        } fixed md:static top-0 left-0 z-40 h-screen md:h-auto w-72 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between`}
      >
        {/* Top */}

        <div>
          {/* Logo */}

          <div className="h-20 flex items-center px-6 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              S
            </div>

            {sidebarOpen && (
              <div className="ml-3">
                <h1 className="font-bold text-slate-800">
                  Smart Leads
                </h1>

                <p className="text-xs text-slate-500">
                  CRM Dashboard
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}

          <nav className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow-sm">
              <LayoutDashboard
                size={20}
              />

              {sidebarOpen && (
                <span>
                  Dashboard
                </span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-100 transition">
              <Users size={20} />

              {sidebarOpen && (
                <span>Leads</span>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom */}

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {sidebarOpen && (
              <div>
                <p className="font-semibold text-slate-800">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition"
          >
            <LogOut size={18} />

            {sidebarOpen && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}

        <header className="min-h-20 bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Left */}

          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}

            <button
              onClick={() =>
                setSidebarOpen(
                  !sidebarOpen
                )
              }
              className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center hover:scale-105 transition"
            >
              {sidebarOpen ? (
                <PanelLeftClose
                  size={18}
                  className="text-slate-700"
                />
              ) : (
                <PanelLeftOpen
                  size={18}
                  className="text-slate-700"
                />
              )}
            </button>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Welcome back,{" "}
                {user?.name}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Controls */}

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6">
            <CSVLink
              data={leads}
              filename="leads.csv"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl transition shadow-sm"
            >
              <Download size={18} />
              Export CSV
            </CSVLink>

            {/* Search */}

            <div className="relative w-full sm:flex-1 sm:min-w-[250px]">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-blue-100"
                onChange={(e) =>
                  debouncedSearch(
                    e.target.value
                  )
                }
              />
            </div>

            {/* Filters */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 bg-white outline-none"
            >
              <option value="">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>

            <select
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 bg-white outline-none"
            >
              <option value="">
                All Sources
              </option>

              <option value="Website">
                Website
              </option>

              <option value="Instagram">
                Instagram
              </option>

              <option value="Referral">
                Referral
              </option>
            </select>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 bg-white outline-none"
            >
              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>
            </select>
          </div>

          {/* Table */}

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                Loading leads...
              </div>
            ) : leads.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                No leads found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-left text-sm text-slate-500">
                      <th className="px-6 py-4">
                        Name
                      </th>

                      <th className="px-6 py-4">
                        Email
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>

                      <th className="px-6 py-4">
                        Source
                      </th>

                      <th className="px-6 py-4">
                        Created
                      </th>

                      <th className="px-6 py-4 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {lead.name}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {lead.email}
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {lead.source}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(
                            lead.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedLeadId(
                                  lead._id
                                );

                                setDeleteModal(
                                  true
                                );
                              }}
                              className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition"
                            >
                              <Trash2
                                size={16}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-slate-500">
              Page {page} of{" "}
              {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight
                  size={18}
                />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Modal */}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-[350px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}

            <div className="bg-red-900 px-6 py-4">
              <h2 className="text-white text-lg font-semibold">
                Delete Lead
              </h2>
            </div>

            {/* Body */}

            <div className="p-6">
              <p className="text-slate-600 mb-6">
                Are you sure you want to
                delete this lead?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setDeleteModal(false)
                  }
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-900 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;