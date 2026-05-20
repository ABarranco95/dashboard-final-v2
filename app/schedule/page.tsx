"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  User,
} from "lucide-react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialJobs = [
  {
    id: 1,
    time: "8:30 AM",
    customer: "Sarah Johnson",
    initial: "SJ",
    service: "Deep Clean",
    cleaner: "Maria G.",
    status: "confirmed",
    dayIndex: 0,
  },
  {
    id: 2,
    time: "9:00 AM",
    customer: "Mike Peters",
    initial: "MP",
    service: "Window Wash",
    cleaner: "Unassigned",
    status: "pending",
    dayIndex: 0,
  },
  {
    id: 3,
    time: "10:30 AM",
    customer: "Anna Lee",
    initial: "AL",
    service: "Move-in Clean",
    cleaner: "James T.",
    status: "in-progress",
    dayIndex: 0,
  },
  {
    id: 4,
    time: "12:00 PM",
    customer: "David Kim",
    initial: "DK",
    service: "Regular Clean",
    cleaner: "Maria G.",
    status: "confirmed",
    dayIndex: 0,
  },
  {
    id: 5,
    time: "2:00 PM",
    customer: "Emily Ross",
    initial: "ER",
    service: "Post-Construction",
    cleaner: "Unassigned",
    status: "pending",
    dayIndex: 0,
  },
  {
    id: 6,
    time: "4:30 PM",
    customer: "Robert Chen",
    initial: "RC",
    service: "Regular Clean",
    cleaner: "James T.",
    status: "confirmed",
    dayIndex: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "bg-teal-50 text-teal-700 border-teal-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertCircle },
  "in-progress": { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: RefreshCw },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

const cleaners = ["Maria G.", "James T.", "Unassigned", "Lisa R.", "Tom H."];

function JobRow({
  job,
  onAssign,
  toast,
}: {
  job: (typeof initialJobs)[0];
  onAssign: (id: number, cleaner: string) => void;
  toast: { id: number; cleaner: string } | null;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setOpen(false));

  const status = statusConfig[job.status];
  const StatusIcon = status.icon;

  return (
    <div className="mb-2 flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3 transition-colors hover:bg-white hover:shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
        {job.initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{job.customer}</p>
        <p className="text-xs text-gray-500">
          {job.service} · {job.time}
        </p>
        {toast?.id === job.id && (
          <p className="mt-1 text-xs font-medium text-green-600">
            Assigned to {toast.cleaner}
          </p>
        )}
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          <User className="h-3 w-3" />
          {job.cleaner}
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${status.color}`}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {open && (
          <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase text-gray-400">
              Assign Cleaner
            </p>
            {cleaners.map((c) => (
              <button
                key={c}
                onClick={() => {
                  onAssign(job.id, c);
                  setOpen(false);
                }}
                className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [jobList, setJobList] = useState(initialJobs);
  const [toast, setToast] = useState<{ id: number; cleaner: string } | null>(null);

  const handleAssign = (id: number, cleaner: string) => {
    setJobList((prev) => prev.map((j) => (j.id === id ? { ...j, cleaner } : j)));
    setToast({ id, cleaner });
    setTimeout(() => setToast(null), 2000);
  };

  const handleNewJob = () => {
    const nextId = Math.max(0, ...jobList.map((j) => j.id)) + 1;
    setJobList((prev) => [
      ...prev,
      {
        id: nextId,
        time: "3:00 PM",
        customer: "New Customer",
        initial: "NC",
        service: "Regular Clean",
        cleaner: "Unassigned",
        status: "pending",
        dayIndex: 0,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Header + Mini Calendar */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold text-gray-900">
              Week of May 19, 2026
            </h2>
            <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleNewJob}
            className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            + New Job
          </button>
        </div>

        <div className="flex gap-2">
          {weekDays.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-1 flex-col items-center rounded-lg border py-2 transition-colors ${
                i === selectedDay
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-gray-100 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-[10px] font-medium uppercase">{day}</span>
              <span className="text-sm font-bold">{19 + i}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900">
            {weekDays[selectedDay]}day, May {19 + selectedDay}
          </h3>
          <span className="text-xs text-gray-500">{jobList.length} jobs</span>
        </div>

        <div className="divide-y divide-gray-50">
          {timeSlots.map((slot) => {
            const slotJobs = jobList.filter((j) => j.time.startsWith(slot.split(":")[0]));
            return (
              <div key={slot} className="flex items-start gap-4 px-5 py-3">
                <div className="mt-0.5 w-16 shrink-0 text-right">
                  <span className="text-xs font-medium text-gray-400">{slot}</span>
                </div>
                <div className="flex-1">
                  {slotJobs.length === 0 ? (
                    <div className="h-8 rounded-lg border border-dashed border-gray-100" />
                  ) : (
                    slotJobs.map((job) => (
                      <JobRow key={job.id} job={job} onAssign={handleAssign} toast={toast} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
