"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Plus, Bell } from "lucide-react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const pageMap: Record<string, { name: string }> = {
  "/": { name: "Today" },
  "/schedule": { name: "Schedule" },
  "/bookings": { name: "Bookings" },
  "/people": { name: "People" },
  "/pipeline": { name: "Pipeline" },
  "/messages": { name: "Messages" },
  "/money": { name: "Money" },
  "/settings": { name: "Settings" },
};

type Notification = { id: number; text: string; time: string; unread: boolean };

const initialNotifications: Notification[] = [
  { id: 1, text: "New booking from Sarah", time: "2 min ago", unread: true },
  { id: 2, text: "Payment received", time: "15 min ago", unread: true },
  { id: 3, text: "Unassigned job alert", time: "1 hr ago", unread: true },
  { id: 4, text: "New lead: Mark Wilson", time: "3 hrs ago", unread: false },
];

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const pageInfo = pageMap[pathname] ?? { name: "Dashboard" };

  const [newOpen, setNewOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const newRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useOutsideClick(newRef, () => setNewOpen(false));
  useOutsideClick(notifRef, () => setNotifOpen(false));
  useOutsideClick(searchRef, () => setSearchOpen(false));

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setNewOpen(false);
        setNotifOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchOpen(true);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex flex-col justify-center">
        <p className="text-[11px] font-medium text-gray-400">
          Dashboard / {pageInfo.name}
        </p>
        <h1 className="text-lg font-semibold text-gray-900">{pageInfo.name}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value) setSearchOpen(false);
            }}
            onKeyDown={handleSearchKey}
            className="w-64 rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
            ⌘K
          </span>
          {searchOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-64 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
              <p className="px-3 py-1 text-[10px] font-semibold uppercase text-gray-400">
                Search results for: {searchQuery}
              </p>
              <div className="cursor-pointer px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Result 1 — Customers
              </div>
              <div className="cursor-pointer px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Result 2 — Bookings
              </div>
              <div className="cursor-pointer px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Result 3 — Settings
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={newRef}>
          <button
            onClick={() => setNewOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
          {newOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              <button
                onClick={() => { router.push("/bookings"); setNewOpen(false); }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                New Booking
              </button>
              <button
                onClick={() => { router.push("/pipeline"); setNewOpen(false); }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                New Lead
              </button>
              <button
                onClick={() => { router.push("/messages"); setNewOpen(false); }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Send Message
              </button>
              <button
                onClick={() => { router.push("/people"); setNewOpen(false); }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Add Provider
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <Bell className="h-5 w-5" />
            {notifications.some((n) => n.unread) && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-72 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {notifications.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-500">No notifications</p>
              ) : (
                <>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50"
                    >
                      {n.unread ? (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                      ) : (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-200" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800">{n.text}</p>
                        <p className="text-[10px] text-gray-400">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 px-3 py-2">
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
          AU
        </div>
      </div>
    </header>
  );
}
