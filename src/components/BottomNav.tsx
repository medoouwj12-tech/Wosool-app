"use client";

import React, { useState } from "react";
import { Home, Car, CalendarCheck, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("home");

  const scrollTo = (id: string, tabName: string) => {
    setActiveTab(tabName);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+201016518716";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0C0C10]/95 backdrop-blur-2xl border-t border-border-subtle/80 pb-[env(safe-area-inset-bottom,8px)] pt-1.5 px-3">
      <div className="max-w-lg mx-auto flex items-center justify-around relative">
        <button
          onClick={() => scrollTo("top", "home")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === "home" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.home}</span>
        </button>

        <button
          onClick={() => scrollTo("fleet-section", "fleet")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === "fleet" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Car className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.fleet}</span>
        </button>

        <div className="relative -top-5">
          <button
            onClick={() => scrollTo("booking-section", "book")}
            className="w-14 h-14 rounded-full gold-btn flex flex-col items-center justify-center shadow-gold-md hover:scale-105 transition-transform touch-press border-2 border-[#0A0A0C]"
            aria-label={t.nav.book}
          >
            <CalendarCheck className="w-6 h-6 text-black" />
          </button>
          <span className="text-[10px] text-gold-300 font-black block text-center mt-1">
            {t.nav.book}
          </span>
        </div>

        <button
          onClick={() => scrollTo("routes-section", "routes")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === "routes" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.routes}</span>
        </button>

        <button
          onClick={handleCall}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-gray-400 hover:text-gold-300 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.call}</span>
        </button>
      </div>
    </nav>
  );
}