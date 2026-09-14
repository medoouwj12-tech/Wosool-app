"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Plane, Sun, Building2, Sparkles } from "lucide-react";
import { DESTINATIONS } from "@/data/locations";
import { useLanguage } from "@/context/LanguageContext";

interface PopularRoutesProps {
  onSelectDestination?: (id: string) => void;
}

export default function PopularRoutes({ onSelectDestination }: PopularRoutesProps) {
  const { t, language } = useLanguage();
  const popularRoutes = DESTINATIONS.filter((d) => d.popular).slice(0, 6);

  const handleSelectRoute = (destId: string) => {
    if (onSelectDestination) {
      onSelectDestination(destId);
    }
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRouteIcon = (id: string) => {
    if (id.includes("airport")) return <Plane className="w-3.5 h-3.5 text-gold-400" />;
    if (id.includes("alamein") || id.includes("north") || id.includes("hekma"))
      return <Sun className="w-3.5 h-3.5 text-amber-400" />;
    return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="routes-section" className="py-6 px-3 sm:px-4 max-w-5xl mx-auto scroll-mt-16 sm:scroll-mt-20">
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.routes.badge}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {t.routes.title} <span className="gold-text-gradient">{t.routes.titleHighlight}</span>
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-md mx-auto">
          {t.routes.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5">
        {popularRoutes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            onClick={() => handleSelectRoute(route.id)}
            className="cursor-pointer glass-card rounded-xl p-3 sm:p-4 border border-gold-500/20 hover:border-gold-500/50 hover:shadow-gold-sm transition-all flex flex-col justify-between group touch-press"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-surface-secondary text-[11px] text-gray-200 border border-white/5">
                  {getRouteIcon(route.id)}
                  <span className="font-semibold">{route.categoryName}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {route.distanceKm} km
                </span>
              </div>

              <div className="space-y-1.5 border-r-2 border-gold-500/30 pr-2.5 my-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{t.routes.fromAlexHome}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-gold-200 group-hover:text-gold-300 transition-colors truncate">
                    {route.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1.5">
                <Clock className="w-3 h-3 text-gold-400" />
                <span>{t.routes.estimatedTime} {route.estimatedHours}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{language === "ar" ? "خدمة مباشرة من الباب للباب" : "Direct Door-to-Door"}</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-gold-400 group-hover:translate-x-[-2px] transition-transform">
                <span>{language === "ar" ? "احجز المشوار" : "Book Route"}</span>
                <ArrowIcon className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}