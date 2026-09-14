"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  Wind,
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Sparkles,
} from "lucide-react";
import { FLEET } from "@/data/fleet";
import { useLanguage } from "@/context/LanguageContext";

interface FleetShowcaseProps {
  onSelectVehicle?: (id: string) => void;
}

export default function FleetShowcase({ onSelectVehicle }: FleetShowcaseProps) {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: language === "ar" ? "جميع السيارات" : "All Vehicles" },
    { id: "sedan", label: language === "ar" ? "سيدان (كورولا / إلنترا / سيراتو)" : "Sedans (Corolla / Elantra / Cerato)" },
    { id: "vip", label: language === "ar" ? "مرسيدس VIP (S & E-Class)" : "Mercedes VIP (S & E-Class)" },
    { id: "family", label: language === "ar" ? "فانات عائلية (H1 / هايس)" : "Family Vans (H1 / HiAce)" },
  ];

  const filteredFleet = FLEET.filter((car) => {
    if (filter === "all") return true;
    if (filter === "vip") return car.id.includes("mercedes");
    if (filter === "family") return car.id.includes("hyundai-h1") || car.id.includes("toyota-hiace");
    if (filter === "sedan") return car.id.includes("corolla") || car.id.includes("elantra") || car.id.includes("cerato");
    return true;
  });

  const handleBookVehicle = (carId: string) => {
    if (onSelectVehicle) {
      onSelectVehicle(carId);
    }
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="fleet-section" className="py-8 px-4 max-w-5xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.fleet.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-cairo">
          {t.fleet.title} <span className="gold-text-gradient">{t.fleet.titleHighlight}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl mx-auto">
          {t.fleet.subtitle}
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-press ${
                filter === cat.id
                  ? "bg-gold-500 text-black shadow-gold-sm"
                  : "bg-surface-secondary text-gray-300 hover:text-white border border-border-subtle"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredFleet.map((vehicle, idx) => {
            const carTitle = language === "ar" ? vehicle.name : vehicle.nameEn;
            const carDesc = language === "ar" ? vehicle.description : vehicle.descriptionEn;
            const carFeatures = language === "ar" ? vehicle.features : vehicle.featuresEn;

            return (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 flex flex-col group hover:shadow-gold-sm"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/40" />

                  {/* Top Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-black/70 backdrop-blur-md border border-gold-500/40 text-gold-300 shadow">
                      {vehicle.tag}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-surface/80 backdrop-blur text-gray-300 border border-white/10">
                      {vehicle.category}
                    </span>
                  </div>

                  {/* Capacity Badges Overlay */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold-400" />
                        <span className="font-bold">{vehicle.passengers} {t.fleet.passengers}</span>
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-gold-400" />
                        <span className="font-bold">{vehicle.luggage} {t.fleet.luggage}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-emerald-400 text-[11px]">
                      <Wind className="w-3 h-3 text-cyan-400" />
                      <span>{t.fleet.superAc}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                        {carTitle}
                      </h3>
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-gray-200">5.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {carDesc}
                    </p>

                    {/* Feature Bullets */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-[11px] text-gray-300">
                      {carFeatures.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA Footer */}
                  <div className="pt-3 border-t border-border-subtle/70 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block">{t.fleet.startingFrom}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black gold-text-gradient font-mono">
                          {vehicle.baseStartingPrice.toLocaleString("ar-EG")}
                        </span>
                        <span className="text-xs text-gray-300 font-bold">{t.fleet.currency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookVehicle(vehicle.id)}
                      className="gold-btn py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 touch-press"
                    >
                      <span>{t.fleet.bookThisCar}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}