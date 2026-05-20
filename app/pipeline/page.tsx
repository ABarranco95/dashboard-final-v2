"use client";

import { useState } from "react";
import {
  Plus,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const columns = [
  { id: "new-lead", title: "New Lead", count: 4, border: "border-t-blue-500", headerBg: "bg-blue-50/60" },
  { id: "qualified", title: "Qualified", count: 3, border: "border-t-amber-500", headerBg: "bg-amber-50/60" },
  { id: "quote-sent", title: "Quote Sent", count: 2, border: "border-t-purple-500", headerBg: "bg-purple-50/60" },
  { id: "scheduled", title: "Scheduled", count: 5, border: "border-t-teal-500", headerBg: "bg-teal-50/60" },
  { id: "completed", title: "Completed", count: 8, border: "border-t-gray-400", headerBg: "bg-gray-50/60" },
];

const columnOrder = columns.map((c) => c.id);

const initialCards: Record<string, { id: number; name: string; service: string; value: number; date: string; initial: string }[]> = {
  "new-lead": [
    { id: 1, name: "Jessica Brown", service: "Deep Clean", value: 350, date: "May 18", initial: "JB" },
    { id: 2, name: "Mark Wilson", service: "Window Wash", value: 180, date: "May 17", initial: "MW" },
    { id: 3, name: "Nina Patel", service: "Move-in Clean", value: 520, date: "May 16", initial: "NP" },
    { id: 4, name: "Chris Evans", service: "Regular Clean", value: 140, date: "May 15", initial: "CE" },
  ],
  qualified: [
    { id: 5, name: "Laura Martinez", service: "Post-Construction", value: 780, date: "May 14", initial: "LM" },
    { id: 6, name: "Kevin O'Brien", service: "Deep Clean", value: 400, date: "May 13", initial: "KO" },
    { id: 7, name: "Sophie Turner", service: "Regular Clean", value: 140, date: "May 12", initial: "ST" },
  ],
  "quote-sent": [
    { id: 8, name: "Daniel Lee", service: "Window Wash", value: 220, date: "May 11", initial: "DL" },
    { id: 9, name: "Rachel Green", service: "Move-out Clean", value: 560, date: "May 10", initial: "RG" },
  ],
  scheduled: [
    { id: 10, name: "Sarah Johnson", service: "Deep Clean", value: 320, date: "May 19", initial: "SJ" },
    { id: 11, name: "Mike Peters", service: "Window Wash", value: 180, date: "May 19", initial: "MP" },
    { id: 12, name: "Anna Lee", service: "Move-in Clean", value: 450, date: "May 20", initial: "AL" },
    { id: 13, name: "David Kim", service: "Regular Clean", value: 140, date: "May 20", initial: "DK" },
    { id: 14, name: "Emily Ross", service: "Post-Construction", value: 680, date: "May 21", initial: "ER" },
  ],
  completed: [
    { id: 15, name: "John Smith", service: "Deep Clean", value: 300, date: "May 10", initial: "JS" },
    { id: 16, name: "Amy Adams", service: "Regular Clean", value: 140, date: "May 9", initial: "AA" },
    { id: 17, name: "Paul Walker", service: "Window Wash", value: 200, date: "May 8", initial: "PW" },
    { id: 18, name: "Monica Bell", service: "Move-in Clean", value: 480, date: "May 7", initial: "MB" },
    { id: 19, name: "Steve Jobs", service: "Regular Clean", value: 140, date: "May 6", initial: "SJ" },
    { id: 20, name: "Lisa Ray", service: "Deep Clean", value: 360, date: "May 5", initial: "LR" },
    { id: 21, name: "Tom Cruise", service: "Post-Construction", value: 720, date: "May 4", initial: "TC" },
    { id: 22, name: "Emma Watson", service: "Window Wash", value: 190, date: "May 3", initial: "EW" },
  ],
};

export default function PipelinePage() {
  const [cards, setCards] = useState(initialCards);
  const [flashId, setFlashId] = useState<number | null>(null);

  const handleAddLead = () => {
    const newId = Math.max(...Object.values(cards).flat().map((c) => c.id)) + 1;
    const newLead = {
      id: newId,
      name: "New Lead",
      service: "Regular Clean",
      value: 140,
      date: "Just now",
      initial: "NL",
    };
    setCards((prev) => ({
      ...prev,
      "new-lead": [newLead, ...prev["new-lead"]],
    }));
  };

  const moveCard = (cardId: number, direction: 1 | -1) => {
    const currentCol = columnOrder.find((col) => cards[col].some((c) => c.id === cardId));
    if (!currentCol) return;
    const idx = columnOrder.indexOf(currentCol);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= columnOrder.length) return;
    const targetCol = columnOrder[newIdx];
    const card = cards[currentCol].find((c) => c.id === cardId)!;
    setCards((prev) => ({
      ...prev,
      [currentCol]: prev[currentCol].filter((c) => c.id !== cardId),
      [targetCol]: [card, ...prev[targetCol]],
    }));
    if (targetCol === "completed") {
      setFlashId(cardId);
      setTimeout(() => setFlashId((id) => (id === cardId ? null : id)), 1500);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div
          key={col.id}
          className={`flex w-72 shrink-0 flex-col rounded-xl border border-gray-200 bg-gray-50/40 ${col.border} border-t-4`}
        >
          {/* Column Header */}
          <div className={`flex items-center justify-between rounded-t-lg px-4 py-3 ${col.headerBg}`}>
            <h3 className="text-sm font-semibold text-gray-800">{col.title}</h3>
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gray-200 px-1.5 text-[10px] font-bold text-gray-700">
              {cards[col.id]?.length ?? 0}
            </span>
          </div>

          {/* Cards */}
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {cards[col.id]?.map((card) => (
              <div
                key={card.id}
                className={`cursor-grab rounded-xl border border-gray-100 p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing ${
                  flashId === card.id ? "bg-green-50 ring-1 ring-green-200" : "bg-white"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    {card.initial}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {card.name}
                  </p>
                </div>
                <p className="mb-2 text-xs text-gray-500">{card.service}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <DollarSign className="h-3 w-3" />
                    {card.value}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {card.date}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-end gap-1">
                  <button
                    onClick={() => moveCard(card.id, -1)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="Move left"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveCard(card.id, 1)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="Move right"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  {flashId === card.id && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            ))}

            {col.id === "new-lead" && (
              <button
                onClick={handleAddLead}
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Lead
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
