"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock,
  CalendarCheck,
  Users,
  GitBranch,
  MessageSquare,
  DollarSign,
  Settings,
  User,
} from "lucide-react";

const mainNav = [
  { label: "Today", href: "/", icon: CalendarDays },
  { label: "Schedule", href: "/schedule", icon: Clock },
  { label: "Bookings", href: "/bookings", icon: CalendarCheck },
  { label: "People", href: "/people", icon: Users },
  { label: "Pipeline", href: "/pipeline", icon: GitBranch },
];

const opsNav = [
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Money", href: "/money", icon: DollarSign },
];

const systemNav = [{ label: "Settings", href: "/settings", icon: Settings }];

function NavSection({
  title,
  items,
  activePath,
}: {
  title: string;
  items: { label: string; href: string; icon: React.ElementType }[];
  activePath: string;
}) {
  return (
    <div className="mb-6">
      <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => {
          const isActive = activePath === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              scroll={false}
              className={`mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-100 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Admin</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <NavSection title="Main" items={mainNav} activePath={pathname} />
        <NavSection title="Operations" items={opsNav} activePath={pathname} />
        <NavSection title="System" items={systemNav} activePath={pathname} />
      </div>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <User className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              Admin User
            </p>
            <p className="truncate text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
