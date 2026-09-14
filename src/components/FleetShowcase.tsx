"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { FLEET } from "@/data/fleet";
import { useLanguage } from "@/context/LanguageContext";

interface FleetShowcaseProps {
  onSelectVehicle?: (id: string) => void;
}

export default function FleetShowcase({ onSelectVehicle }: FleetShowcaseProps) {
  const { language } = useLanguage();

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
    <section id="fleet-section" className="py-6 px-3 sm:px-4 max-w-5xl mx-auto scroll-mt-16 sm:scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{language === "ar" ? "أسطول سيارات وصول" : "Wosool Limousine Fleet"}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {language === "ar" ? (
            <>سيارات حديثة <span className="gold-text-gradient">لراحتك في السفر</span></>
          ) : (
            <>Modern Fleet <span className="gold-text-gradient">For Your Comfort</span></>
          )}
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
          {language === "ar"
            ? "سيارات موديل حديث مجهزة بأعلى وسائل الراحة والتكييف مع سائقين على أعلى مستوى من الخبرة والأمانة"
            : "Modern sanitized vehicles equipped with superior AC and driven by experienced professional chauffeurs"}
        </p>
      </div>

      {/* Fleet Cards Grid (2 Real Cars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {FLEET.map((vehicle, idx) => {
          const carTitle = language === "ar" ? vehicle.name : vehicle.nameEn;
          const carDesc = language === "ar" ? vehicle.description : vehicle.descriptionEn;
          const carFeatures = language === "ar" ? vehicle.features : vehicle.featuresEn;

          return (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-gold-500/25 hover:border-gold-500/50 transition-all flex flex-col group shadow-glass"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-300 shadow">
                    {vehicle.tag}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-surface/85 backdrop-blur text-gray-200 border border-white/10">
                    {vehicle.category}
                  </span>
                </div>

                {/* Capacity Badges Overlay */}
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-gold-400" />
                      <span>{vehicle.passengers} {language === "ar" ? "ركاب" : "Seats"}</span>
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-gold-400" />
                      <span>{vehicle.luggage} {language === "ar" ? "حقائب" : "Bags"}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                      {carTitle}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-gray-200">5.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                    {carDesc}
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-white/5 text-[11px] text-gray-300">
                    {carFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Footer without price */}
                <div className="pt-3 border-t border-border-subtle/70 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-medium">{language === "ar" ? "سفر فوري متاح" : "Ready for travel"}</span>
                  </div>

                  <button
                    onClick={() => handleBookVehicle(vehicle.id)}
                    className="gold-btn py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-1.5 touch-press shadow-gold-sm hover:shadow-gold-md"
                  >
                    <span>{language === "ar" ? "اختر هذه السيارة" : "Select This Car"}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}