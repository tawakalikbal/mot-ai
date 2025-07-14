"use client";
import React from "react";

import { ChatbotWidget } from "@/components/ChatbotWidget";
export default function Page() {
  return (
    <section className="min-h-[200vh] bg-slate-700 relative p-20">
      <ChatbotWidget />
    </section>
  );
}
