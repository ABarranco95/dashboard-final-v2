"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const bookingsData = [
  { id: "#BK-1042", customer: "Sarah Johnson", service: "Deep Clean", date: "May 19, 2026", time: "9:00 AM", amount: 320, status: "confirmed" },
  { id: "#BK-1041", customer: "Mike Peters", service: "Window Wash", date: "May 19, 2026", time: "11:30 AM", amount: 180, status: "pending" },
  { id: "#BK-1040", customer: "Anna Lee", service: "Move-in Clean", date: "May 20, 2026", time: "2:00 PM", amount: 450, status: "confirmed" },
  { id: "#BK-1039", customer: "David Kim", service: "Regular Clean", date: "May 20, 2026", time: "4:30 PM", amount: 140, status: "confirmed" },
  { id: "#BK-1038", customer: "Emily Ross", service: "Post-Construction", date: "May 21, 2026", time: "10:00 AM", amount: 680, status: "pending" },
  { id: "#BK-1037", customer: "Robert Chen", service: "Regular Clean", date: "May 21, 2026", time: "1:00 PM", amount: 140, status: "confirmed" },
  { id: "#BK-1036", customer: "Lisa Wong", service: "Deep Clean", date: "May 22, 2026", time: "9:30 AM", amount: 350, status: "cancelled" },
  { id: "#BK-1035", customer: "James Miller", service: "Window Wash", date: "May 22, 2026", time: "3:00 PM", amount: 200, status: "confirmed" },
  { id: "#BK-1034", customer: "Karen Davis", service: "Move-out Clean", date: "May 23, 2026", time: "11:00 AM", amount: 520, status: "pending" },
  { id: "#BK-1033", customer: "Tom Anderson", service: "Regular Clean", date: "May 23, 2026", time: "4:00 PM", amount: 140, status: "confirmed" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "bg-teal-50 text-teal-700 border-teal-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

function ActionsCell({
  booking,
  onCancel,
}: {
  booking: (typeof bookingsData)[0];
  onCancel: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
          <button
            onClick={() => setOpen(false)}
            className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            View details
          </button>
          <button
            onClick={() => setOpen(false)}
            className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit booking
          </button>
          <button
            onClick={() => {
              onCancel(booking.id);
              setOpen(false);
            }}
            className="block w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-gray-50"
          >
            Cancel booking
          </button>
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState(bookingsData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const total = filtered.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const paginated = filtered.slice(start - 1, end);

  useEffect(() => {
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [currentPage, maxPage]);

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
  };

  const handleExport = () => {
    const headers = ["Booking #", "Customer", "Service", "Date", "Time", "Amount", "Status"];
    const rows = filtered.map((b) => [b.id, b.customer, b.service, b.date, b.time, String(b.amount), b.status]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            >
              <option>All</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Date range"
            className="w-40 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3 font-semibold text-gray-600">Booking #</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Customer</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Service</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Date</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Time</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Amount</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((b) => {
              const status = statusConfig[b.status];
              const StatusIcon = status.icon;
              return (
                <tr
                  key={b.id}
                  className="transition-colors hover:bg-gray-50/60"
                >
                  <td className="px-5 py-3.5 font-mono text-xs font-medium text-gray-500">
                    {b.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {b.customer}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{b.service}</td>
                  <td className="px-5 py-3.5 text-gray-600">{b.date}</td>
                  <td className="px-5 py-3.5 text-gray-600">{b.time}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    ${b.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${status.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ActionsCell booking={b} onCancel={handleCancel} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <p className="text-xs text-gray-500">
            Showing {start}-{end} of {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === maxPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
