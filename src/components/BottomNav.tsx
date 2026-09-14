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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0C0C10]/95 backdrop-blur-2xl border-t border-border-subtle/80 pb-[env(safe-area-inset-bottom,6px)] pt-1 px-2">
      <div className="max-w-md mx-auto flex items-center justify-between relative h-14">
        {/* Home */}
        <button
          onClick={() => scrollTo("top", "home")}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            activeTab === "home" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] mt-0.5">{t.nav.home}</span>
        </button>

        {/* Fleet */}
        <button
          onClick={() => scrollTo("fleet-section", "fleet")}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            activeTab === "fleet" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Car className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] mt-0.5">{t.nav.fleet}</span>
        </button>

        {/* Big Center Golden Booking Action Button */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-3">
          <button
            onClick={() => scrollTo("booking-section", "book")}
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-full gold-btn flex items-center justify-center shadow-gold-md hover:scale-105 transition-transform touch-press border-2 border-[#0A0A0C]"
            aria-label={t.nav.book}
          >
            <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>
          <span className="text-[9px] sm:text-[10px] text-gold-300 font-black block text-center mt-0.5">
            {t.nav.book}
          </span>
        </div>

        {/* Routes */}
        <button
          onClick={() => scrollTo("routes-section", "routes")}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            activeTab === "routes" ? "text-gold-300 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] mt-0.5">{t.nav.routes}</span>
        </button>

        {/* Direct Call */}
        <button
          onClick={handleCall}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-gray-400 hover:text-gold-300 transition-colors"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] mt-0.5">{t.nav.call}</span>
        </button>
      </div>
    </nav>
  );
}