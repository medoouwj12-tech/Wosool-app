"use client";

import React from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingContact() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/201016518716?text=" +
        encodeURIComponent("السلام عليكم، أود الاستفسار عن رحلات ليموزين وصول من الإسكندرية"),
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-3 sm:left-4 z-30 flex flex-col gap-2">
      <button
        onClick={handleWhatsApp}
        aria-label="تواصل فوري عبر واتساب"
        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] transition-all hover:scale-105 touch-press flex items-center justify-center border border-white/20"
      >
        <span className="animate-ping absolute top-0 right-0 h-3 w-3 rounded-full bg-[#25D366] opacity-75" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border border-white" />
        <WhatsAppIcon className="w-6 h-6" />
      </button>
    </div>
  );
}