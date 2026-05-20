"use client";

import { useState, useRef, useEffect } from "react";
import {
  Building2,
  Bell,
  Users,
  CreditCard,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const tabs = [
  { id: "profile", label: "Business Profile", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "team", label: "Team Members", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const initialTeamMembers = [
  { name: "Admin User", email: "admin@example.com", role: "Owner", status: "active" },
  { name: "Maria Garcia", email: "maria@example.com", role: "Manager", status: "active" },
  { name: "James Taylor", email: "james@example.com", role: "Cleaner", status: "active" },
  { name: "Lisa Rodriguez", email: "lisa@example.com", role: "Cleaner", status: "inactive" },
];

const notificationSettings = [
  { id: "new-booking", label: "New booking received", email: true, push: false },
  { id: "cancellation", label: "Booking cancelled", email: true, push: true },
  { id: "payment", label: "Payment received", email: false, push: true },
  { id: "daily-summary", label: "Daily summary", email: true, push: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toggles, setToggles] = useState(notificationSettings);

  const [companyName, setCompanyName] = useState("SparkleClean Pro");
  const [phone, setPhone] = useState("(415) 555-0199");
  const [address, setAddress] = useState("123 Market St, Suite 400\nSan Francisco, CA 94105");
  const [timezone, setTimezone] = useState("Pacific Time (PT)");

  const [saveToast, setSaveToast] = useState(false);

  const [teamList, setTeamList] = useState(initialTeamMembers);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Cleaner");

  const [updateCardOpen, setUpdateCardOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [planCancelled, setPlanCancelled] = useState(false);

  const inviteRef = useRef<HTMLDivElement>(null);
  useOutsideClick(inviteRef, () => setInviteOpen(false));

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setInviteOpen(false);
        setUpdateCardOpen(false);
        setCancelConfirm(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const flipToggle = (id: string, key: "email" | "push") => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [key]: !t[key] } : t))
    );
  };

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleRemove = (email: string) => {
    if (confirmRemove === email) {
      setTeamList((prev) => prev.filter((m) => m.email !== email));
      setConfirmRemove(null);
    } else {
      setConfirmRemove(email);
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    setTeamList((prev) => [
      ...prev,
      { name: inviteName.trim(), email: inviteEmail.trim(), role: inviteRole, status: "active" },
    ]);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Cleaner");
    setInviteOpen(false);
  };

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateCardOpen(false);
    setCardNumber("");
    setCardExpiry("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* Left Sub-nav */}
      <div className="flex w-56 shrink-0 flex-col gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Content */}
      <div className="relative flex-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {saveToast && (
          <div className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-opacity">
            Changes saved successfully
          </div>
        )}

        {activeTab === "profile" && (
          <div className="mx-auto max-w-xl space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Business Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                    <Upload className="h-5 w-5" />
                  </div>
                  <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                    Upload new logo
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                >
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="mx-auto max-w-xl space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>

            <div className="space-y-3">
              {toggles.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                      Email
                      <button
                        onClick={() => flipToggle(item.id, "email")}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          item.email ? "bg-teal-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            item.email ? "left-4.5 translate-x-0" : "left-0.5"
                          }`}
                          style={{
                            transform: item.email ? "translateX(16px)" : "translateX(0)",
                          }}
                        />
                      </button>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                      Push
                      <button
                        onClick={() => flipToggle(item.id, "push")}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          item.push ? "bg-teal-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
                          style={{
                            transform: item.push ? "translateX(16px)" : "translateX(0)",
                            left: "2px",
                          }}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Team Members
              </h2>
              <button
                onClick={() => setInviteOpen(true)}
                className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                + Invite Member
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 font-semibold text-gray-600">Name</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Role</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Email</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {teamList.map((member, i) => (
                    <tr key={i} className="transition-colors hover:bg-gray-50/60">
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{member.role}</td>
                      <td className="px-5 py-3 text-gray-600">{member.email}</td>
                      <td className="px-5 py-3">
                        {member.status === "active" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            <XCircle className="h-3 w-3" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleRemove(member.email)}
                          className={`rounded-lg text-xs font-medium transition-colors ${
                            confirmRemove === member.email
                              ? "bg-red-50 px-2 py-1 text-red-600 hover:bg-red-100"
                              : "p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          }`}
                        >
                          {confirmRemove === member.email ? (
                            "Confirm?"
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="mx-auto max-w-xl space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Billing</h2>

            <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-5">
              <p className="text-sm font-medium text-gray-700">Current Plan</p>
              {planCancelled ? (
                <>
                  <p className="mt-1 text-2xl font-bold text-gray-900">Free Plan</p>
                  <p className="mt-1 text-xs text-gray-500">Subscription cancelled</p>
                </>
              ) : (
                <>
                  <p className="mt-1 text-2xl font-bold text-gray-900">Pro</p>
                  <p className="mt-1 text-xs text-gray-500">$49/month · Renews June 1, 2026</p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Card on File
                </label>
                {updateCardOpen ? (
                  <form onSubmit={handleUpdateCard} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateCardOpen(false)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">**** **** **** 4242</span>
                    <span className="ml-auto text-xs text-gray-400">Expires 08/27</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setUpdateCardOpen(true)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Update Card
                </button>
                {cancelConfirm ? (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                    <span className="text-sm font-medium text-red-700">Are you sure?</span>
                    <button
                      onClick={() => {
                        setPlanCancelled(true);
                        setCancelConfirm(false);
                      }}
                      className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setCancelConfirm(false)}
                      className="rounded border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCancelConfirm(true)}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Member Modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            ref={inviteRef}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Invite Member</h3>
              <button
                onClick={() => setInviteOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                >
                  <option>Owner</option>
                  <option>Manager</option>
                  <option>Cleaner</option>
                </select>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
