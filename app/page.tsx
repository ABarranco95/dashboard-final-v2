"use client";

import Link from "next/link";
import {
  Briefcase,
  DollarSign,
  CreditCard,
  ClipboardList,
  Mail,
  LineChart,
  TrendingUp,
  TrendingDown,
  CalendarPlus,
  UserPlus,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Jobs today",
    value: "12",
    trend: "+5.2%",
    up: true,
    icon: Briefcase,
  },
  {
    label: "Revenue today",
    value: "$3,420",
    trend: "+12.1%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "Pending payments",
    value: "8",
    trend: "-2.4%",
    up: false,
    icon: CreditCard,
  },
  {
    label: "Unassigned jobs",
    value: "3",
    trend: "0.0%",
    up: true,
    icon: ClipboardList,
  },
  {
    label: "Unread messages",
    value: "7",
    trend: "+3 new",
    up: true,
    icon: Mail,
  },
  {
    label: "Conversion rate",
    value: "24%",
    trend: "+1.2%",
    up: true,
    icon: LineChart,
  },
];

const quickActions = [
  { label: "New Booking", icon: CalendarPlus, href: "/bookings" },
  { label: "New Lead", icon: UserPlus, href: "/pipeline" },
  { label: "Send Message", icon: Mail, href: "/messages" },
  { label: "Add Provider", icon: Users, href: "/people" },
];

const schedule = [
  {
    time: "9:00 AM",
    customer: "Sarah Johnson",
    service: "Deep Clean",
    status: "confirmed",
  },
  {
    time: "11:30 AM",
    customer: "Mike Peters",
    service: "Window Wash",
    status: "pending",
  },
  {
    time: "2:00 PM",
    customer: "Anna Lee",
    service: "Move-in Clean",
    status: "confirmed",
  },
  {
    time: "4:30 PM",
    customer: "David Kim",
    service: "Regular Clean",
    status: "confirmed",
  },
];

const actionsNeeded = [
  { label: "Unread messages", count: 3, color: "border-l-blue-500", href: "/messages" },
  { label: "Unassigned leads", count: 5, color: "border-l-amber-500", href: "/pipeline" },
  { label: "Unpaid bookings", count: 2, color: "border-l-red-500", href: "/money" },
  { label: "Unstaffed jobs", count: 1, color: "border-l-orange-500", href: "/schedule" },
  { label: "Stale quotes", count: 4, color: "border-l-gray-400", href: "/pipeline" },
  { label: "At-risk leads", count: 2, color: "border-l-rose-500", href: "/pipeline" },
];

const recentActivity = [
  {
    text: "Lead moved to Qualified",
    time: "2 min ago",
    icon: TrendingUp,
    color: "text-teal-600 bg-teal-50",
  },
  {
    text: "New contact: James Wilson",
    time: "15 min ago",
    icon: UserPlus,
    color: "text-blue-600 bg-blue-50",
  },
  {
    text: "New booking from Emma Davis",
    time: "32 min ago",
    icon: CalendarPlus,
    color: "text-teal-600 bg-teal-50",
  },
  {
    text: "Payment received: $240",
    time: "1 hr ago",
    icon: DollarSign,
    color: "text-green-600 bg-green-50",
  },
  {
    text: "Job completed: #1024",
    time: "2 hrs ago",
    icon: CheckCircle2,
    color: "text-gray-600 bg-gray-100",
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.up ? TrendingUp : TrendingDown;
          const trendColor = stat.up ? "text-green-600" : "text-red-600";
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
                  <TrendIcon className="h-3 w-3" />
                  {stat.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm font-medium text-teal-700 shadow-sm transition-colors hover:bg-teal-50"
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Link>
          );
        })}
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Today&apos;s Schedule
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {item.time}
                  </span>
                </div>
                <div className="flex-1 px-4">
                  <p className="text-sm font-medium text-gray-900">
                    {item.customer}
                  </p>
                  <p className="text-xs text-gray-500">{item.service}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.status === "confirmed"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.status === "confirmed" ? "Confirmed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 px-5 py-3">
            <Link
              href="/schedule"
              className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Full calendar <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Action Needed */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Action Needed
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {actionsNeeded.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center justify-between border-l-4 px-5 py-3 transition-colors hover:bg-gray-50 ${item.color}`}
              >
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-gray-100 px-1.5 text-xs font-bold text-gray-700">
                    {item.count}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.text}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
