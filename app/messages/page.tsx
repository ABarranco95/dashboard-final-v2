"use client";

import { useState } from "react";
import { Send, Search } from "lucide-react";

const initialConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    initial: "SJ",
    preview: "Can we reschedule tomorrow's cleaning to 2pm?",
    time: "10:23 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Mike Peters",
    initial: "MP",
    preview: "Thanks for the quick turnaround!",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Anna Lee",
    initial: "AL",
    preview: "Do you offer move-out cleaning services?",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    name: "David Kim",
    initial: "DK",
    preview: "Invoice #1040 has been paid.",
    time: "May 18",
    unread: false,
  },
  {
    id: 5,
    name: "Emily Ross",
    initial: "ER",
    preview: "What products do you use for deep cleaning?",
    time: "May 17",
    unread: false,
  },
];

const threadMessages: Record<number, { from: "customer" | "admin"; text: string; time: string }[]> = {
  1: [
    { from: "customer", text: "Hi! I have a scheduling conflict for tomorrow.", time: "10:15 AM" },
    { from: "admin", text: "No problem, what time works better for you?", time: "10:18 AM" },
    { from: "customer", text: "Can we reschedule tomorrow's cleaning to 2pm?", time: "10:23 AM" },
  ],
  2: [
    { from: "admin", text: "Your window wash is confirmed for Friday at 11am.", time: "May 18, 3:00 PM" },
    { from: "customer", text: "Thanks for the quick turnaround!", time: "Yesterday, 9:12 AM" },
  ],
  3: [
    { from: "customer", text: "Hi, I'm moving out next month.", time: "Yesterday, 2:00 PM" },
    { from: "customer", text: "Do you offer move-out cleaning services?", time: "Yesterday, 2:01 PM" },
  ],
  4: [
    { from: "admin", text: "Invoice #1040 for $450 is now due.", time: "May 16, 10:00 AM" },
    { from: "customer", text: "Invoice #1040 has been paid.", time: "May 18, 4:30 PM" },
  ],
  5: [
    { from: "customer", text: "I have allergies to certain chemicals.", time: "May 17, 11:00 AM" },
    { from: "customer", text: "What products do you use for deep cleaning?", time: "May 17, 11:01 AM" },
  ],
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState(threadMessages);
  const [conversationList, setConversationList] = useState(initialConversations);
  const [convSearch, setConvSearch] = useState("");

  const filteredConversations = conversationList.filter(
    (c) =>
      c.name.toLowerCase().includes(convSearch.toLowerCase()) ||
      c.preview.toLowerCase().includes(convSearch.toLowerCase())
  );

  const active =
    filteredConversations.find((c) => c.id === activeId) ??
    conversationList.find((c) => c.id === activeId)!;
  const activeMessages = messages[activeId] ?? [];

  const handleSend = () => {
    if (!reply.trim()) return;
    const text = reply.trim();
    setMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] ?? []),
        { from: "admin" as const, text, time: "Just now" },
      ],
    }));
    setConversationList((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, preview: text, time: "Just now" } : c))
    );
    setReply("");
  };

  const handleSelect = (id: number) => {
    setActiveId(id);
    setConversationList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Conversation List */}
      <div className="flex w-72 shrink-0 flex-col border-r border-gray-200">
        <div className="border-b border-gray-100 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={convSearch}
              onChange={(e) => setConvSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelect(conv.id)}
              className={`flex w-full items-start gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors ${
                activeId === conv.id
                  ? "bg-teal-50/60"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                {conv.initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="truncate text-sm font-semibold text-gray-900">
                    {conv.name}
                  </span>
                  <span className="shrink-0 text-[10px] text-gray-400">
                    {conv.time}
                  </span>
                </div>
                <p className="truncate text-xs text-gray-500">{conv.preview}</p>
              </div>
              {conv.unread && activeId !== conv.id && (
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thread View */}
      <div className="flex flex-1 flex-col">
        {/* Thread Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
            {active.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{active.name}</p>
            <p className="text-xs text-gray-500">Customer</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {activeMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "admin"
                    ? "rounded-br-md bg-teal-600 text-white"
                    : "rounded-bl-md bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    msg.from === "admin" ? "text-teal-100" : "text-gray-400"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
            <button
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white transition-colors hover:bg-teal-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
