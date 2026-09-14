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
    <div className="fixed bottom-20 left-4 z-30 flex flex-col gap-2">
      <button
        onClick={handleWhatsApp}
        aria-label="تواصل فوري عبر واتساب"
        className="relative p-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] transition-all hover:scale-110 touch-press group border border-white/20"
      >
        <span className="animate-ping absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-[#25D366] opacity-75" />
        <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-[#25D366] border-2 border-white" />
        <WhatsAppIcon className="w-7 h-7" />
      </button>
    </div>
  );
}