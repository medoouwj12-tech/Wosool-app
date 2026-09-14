"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Sparkles, Globe, Shield } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { toggleLanguage, t } = useLanguage();

  const handleCall = () => {
    window.location.href = "tel:+201016518716";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/201016518716", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-border-subtle/80">
      {/* Top announcement bar */}
      <div className="w-full bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#121218] border-b border-gold-500/10 py-1 px-3 text-[11px]">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-gray-300 gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-gray-200 truncate">{t.header.serviceStatus}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="tel:+201016518716"
              className="hover:text-gold-400 transition-colors font-mono font-bold text-xs"
              dir="ltr"
            >
              01016518716
            </a>
          </div>
        </div>
      </div>

      {/* Main App Bar - Mobile Optimized */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-gold-500/40 p-0.5 bg-black shadow-gold-sm flex-shrink-0 group-hover:border-gold-400 transition-colors">
            <Image
              src="/logo.jpeg"
              alt="شعار وصول ليموزين"
              width={44}
              height={44}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-xl font-black tracking-tight gold-text-gradient font-cairo">
                {t.brand.name}
              </span>
              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-gold-500/15 border border-gold-500/30 text-gold-300">
                {t.brand.badge}
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] text-gray-400 tracking-wider font-light truncate">
              {t.brand.tagline}
            </span>
          </div>
        </Link>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-surface-secondary border border-border-subtle text-gray-200 hover:text-white text-xs font-bold transition-all touch-press"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] sm:text-[11px] font-mono">{t.header.switchLang}</span>
          </button>

          {/* Quick Call Icon Button */}
          <button
            onClick={handleCall}
            aria-label={t.header.instantCall}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-surface-secondary border border-gold-500/30 text-gold-300 hover:text-white hover:bg-gold-500/20 text-xs font-bold transition-all touch-press flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden md:inline">{t.header.instantCall}</span>
          </button>

          {/* Authentic WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            aria-label={t.header.whatsapp}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 text-xs font-bold transition-all touch-press shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs">{t.header.whatsapp}</span>
          </button>
        </div>
      </div>
    </header>
  );
}