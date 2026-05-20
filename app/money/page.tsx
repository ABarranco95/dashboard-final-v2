"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  RefreshCw,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const chartData = [45, 62, 38, 80, 55, 70, 95];
const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxChart = Math.max(...chartData);

const transactions = [
  { date: "May 19, 2026", customer: "Sarah Johnson", type: "Booking Payment", amount: 320, status: "completed" },
  { date: "May 19, 2026", customer: "David Kim", type: "Booking Payment", amount: 140, status: "completed" },
  { date: "May 18, 2026", customer: "Anna Lee", type: "Invoice Paid", amount: 450, status: "completed" },
  { date: "May 18, 2026", customer: "Emily Ross", type: "Partial Payment", amount: 200, status: "pending" },
  { date: "May 17, 2026", customer: "Robert Chen", type: "Refund", amount: -140, status: "completed" },
  { date: "May 17, 2026", customer: "Mike Peters", type: "Booking Payment", amount: 180, status: "completed" },
];

const invoices = [
  { customer: "Emily Ross", amount: 480, daysOverdue: 5, percent: 70 },
  { customer: "Lisa Wong", amount: 350, daysOverdue: 12, percent: 45 },
  { customer: "James Miller", amount: 200, daysOverdue: 3, percent: 85 },
  { customer: "Karen Davis", amount: 520, daysOverdue: 8, percent: 55 },
  { customer: "Tom Anderson", amount: 140, daysOverdue: 1, percent: 95 },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  completed: { label: "Completed", color: "bg-teal-50 text-teal-700 border-teal-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
};

function formatCurrency(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function MoneyPage() {
  const [reminderSent, setReminderSent] = useState<number | null>(null);

  const totalRevenue = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const outstanding = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);
  const paidThisWeek = transactions
    .filter((t) => t.status === "completed" && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const refunds = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const stats = [
    { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "+8.2%", up: true, icon: DollarSign },
    { label: "Outstanding", value: formatCurrency(outstanding), change: "-2.1%", up: true, icon: CreditCard },
    { label: "Paid This Week", value: formatCurrency(paidThisWeek), change: "+14.3%", up: true, icon: CheckCircle2 },
    { label: "Refunds", value: formatCurrency(refunds), change: "+0.5%", up: false, icon: RefreshCw },
  ];

  const handleSendReminder = (index: number) => {
    setReminderSent(index);
    setTimeout(() => setReminderSent((i) => (i === index ? null : i)), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.up ? TrendingUp : TrendingDown;
          const trendColor = stat.up ? "text-green-600" : "text-red-600";
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Revenue This Week</h2>
          <span className="text-xs text-gray-500">May 13 – May 19</span>
        </div>
        <div className="flex items-end gap-3">
          {chartData.map((val, i) => {
            const height = (val / maxChart) * 100;
            const isMax = val === maxChart;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full">
                  <div
                    className={`w-full rounded-t-md transition-all ${isMax ? "bg-teal-500" : "bg-gray-200"}`}
                    style={{ height: `${Math.max(height, 8)}px` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-500">
                  {chartLabels[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Transactions
            </h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/40">
                <th className="px-5 py-2.5 text-xs font-semibold text-gray-500">Date</th>
                <th className="px-5 py-2.5 text-xs font-semibold text-gray-500">Customer</th>
                <th className="px-5 py-2.5 text-xs font-semibold text-gray-500">Type</th>
                <th className="px-5 py-2.5 text-xs font-semibold text-gray-500">Amount</th>
                <th className="px-5 py-2.5 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t, i) => {
                const status = statusConfig[t.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={i} className="transition-colors hover:bg-gray-50/60">
                    <td className="px-5 py-3 text-xs text-gray-500">{t.date}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{t.customer}</td>
                    <td className="px-5 py-3 text-xs text-gray-600">{t.type}</td>
                    <td className={`px-5 py-3 font-medium ${t.amount < 0 ? "text-red-600" : "text-gray-900"}`}>
                      {t.amount < 0 ? "-$" : "$"}{Math.abs(t.amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${status.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Outstanding Invoices */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Outstanding Invoices
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.map((inv, i) => (
              <div key={i} className="px-5 py-4 transition-colors hover:bg-gray-50/40">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {inv.customer}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ${inv.amount.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${inv.percent}%` }}
                    />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {inv.daysOverdue}d overdue
                  </span>
                </div>
                <div className="flex justify-end">
                  {reminderSent === i ? (
                    <span className="text-xs font-medium text-green-600">
                      Reminder sent to {inv.customer}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSendReminder(i)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <Send className="h-3 w-3" />
                      Send Reminder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
