"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  UserCheck,
  UserX,
  X,
  CheckCircle2,
} from "lucide-react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const initialCustomers = [
  { name: "Sarah Johnson", initial: "SJ", phone: "(415) 555-0123", email: "sarah.j@example.com", lastBooking: "May 19, 2026", totalBookings: 12 },
  { name: "Mike Peters", initial: "MP", phone: "(415) 555-0198", email: "mike.p@example.com", lastBooking: "May 15, 2026", totalBookings: 4 },
  { name: "Anna Lee", initial: "AL", phone: "(510) 555-0145", email: "anna.lee@example.com", lastBooking: "May 10, 2026", totalBookings: 8 },
  { name: "David Kim", initial: "DK", phone: "(408) 555-0176", email: "david.k@example.com", lastBooking: "May 18, 2026", totalBookings: 6 },
  { name: "Emily Ross", initial: "ER", phone: "(650) 555-0134", email: "emily.r@example.com", lastBooking: "Apr 28, 2026", totalBookings: 2 },
  { name: "Robert Chen", initial: "RC", phone: "(415) 555-0167", email: "robert.c@example.com", lastBooking: "May 12, 2026", totalBookings: 9 },
];

const initialProviders = [
  { name: "Maria Garcia", initial: "MG", rating: 4.9, jobsCompleted: 142, status: "active" },
  { name: "James Taylor", initial: "JT", rating: 4.7, jobsCompleted: 98, status: "active" },
  { name: "Lisa Rodriguez", initial: "LR", rating: 4.8, jobsCompleted: 115, status: "on-leave" },
  { name: "Tom Harris", initial: "TH", rating: 4.5, jobsCompleted: 67, status: "active" },
  { name: "Priya Patel", initial: "PP", rating: 5.0, jobsCompleted: 34, status: "active" },
];

const mockJobs = [
  "Deep Clean — Sarah J.",
  "Window Wash — Mike P.",
  "Regular Clean — David K.",
];

function getInitial(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ProviderCard({
  p,
  assignedProvider,
  onAssign,
}: {
  p: (typeof initialProviders)[0];
  assignedProvider: string | null;
  onAssign: (name: string, job: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
          {p.initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{p.name}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Briefcase className="h-3 w-3" />
            {p.jobsCompleted} jobs
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(p.rating)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-200"
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-500">{p.rating}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {p.status === "active" ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
            <UserCheck className="h-3 w-3" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            <UserX className="h-3 w-3" />
            On Leave
          </span>
        )}
        {assignedProvider === p.name && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3 w-3" />
            Assigned!
          </span>
        )}
      </div>
      <div className="relative mt-4 flex justify-end" ref={dropdownRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-teal-700"
        >
          Assign Job
        </button>
        {open && (
          <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase text-gray-400">
              Select Job
            </p>
            {mockJobs.map((job) => (
              <button
                key={job}
                onClick={() => {
                  onAssign(p.name, job);
                  setOpen(false);
                }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {job}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PeoplePage() {
  const [tab, setTab] = useState<"customers" | "providers">("customers");
  const [search, setSearch] = useState("");
  const [customerList, setCustomerList] = useState(initialCustomers);
  const [providerList, setProviderList] = useState(initialProviders);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newType, setNewType] = useState<"customer" | "provider">("customer");

  const [viewCustomer, setViewCustomer] = useState<(typeof initialCustomers)[0] | null>(null);

  const [assignedProvider, setAssignedProvider] = useState<string | null>(null);

  const addModalRef = useRef<HTMLDivElement>(null);
  const viewModalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(addModalRef, () => setAddModalOpen(false));
  useOutsideClick(viewModalRef, () => setViewCustomer(null));

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAddModalOpen(false);
        setViewCustomer(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const filteredCustomers = customerList.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredProviders = providerList.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const person = {
      name: newName.trim(),
      initial: getInitial(newName.trim()),
      phone: newPhone.trim() || "(000) 000-0000",
      email: newEmail.trim() || "no-email@example.com",
      lastBooking: "—",
      totalBookings: 0,
    };
    if (newType === "customer") {
      setCustomerList((prev) => [...prev, person]);
    } else {
      setProviderList((prev) => [
        ...prev,
        {
          name: person.name,
          initial: person.initial,
          rating: 0,
          jobsCompleted: 0,
          status: "active",
        },
      ]);
    }
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewType("customer");
    setAddModalOpen(false);
  };

  const handleAssign = (providerName: string, _job: string) => {
    setAssignedProvider(providerName);
    setTimeout(() => setAssignedProvider((p) => (p === providerName ? null : p)), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tabs + Search + Add */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={() => setTab("customers")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "customers"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setTab("providers")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "providers"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Providers / Cleaners
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${tab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tab === "customers"
          ? filteredCustomers.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                    {c.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {c.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {c.totalBookings} total bookings
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {c.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    Last: {c.lastBooking}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setViewCustomer(c)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          : filteredProviders.map((p) => (
              <ProviderCard
                key={p.name}
                p={p}
                assignedProvider={assignedProvider}
                onAssign={handleAssign}
              />
            ))}
      </div>

      {/* Add New Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            ref={addModalRef}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Add New</h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType("customer")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      newType === "customer"
                        ? "border-teal-300 bg-teal-50 text-teal-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType("provider")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      newType === "provider"
                        ? "border-teal-300 bg-teal-50 text-teal-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Provider
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Customer Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            ref={viewModalRef}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {viewCustomer.name}
              </h3>
              <button
                onClick={() => setViewCustomer(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                {viewCustomer.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                {viewCustomer.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                Last booking: {viewCustomer.lastBooking}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-gray-400" />
                Total bookings: {viewCustomer.totalBookings}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewCustomer(null)}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
