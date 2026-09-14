"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GOVERNORATES = [
  { name: "القاهرة", nameEn: "Cairo", icon: "🏛️", popular: true, time: "3 ساعات" },
  { name: "الجيزة", nameEn: "Giza", icon: "🗿", popular: true, time: "3.5 ساعة" },
  { name: "مطار القاهرة", nameEn: "Cairo Airport", icon: "✈️", popular: true, time: "3 ساعات" },
  { name: "العين السخنة", nameEn: "Ain Sokhna", icon: "🏖️", popular: true, time: "4 ساعات" },
  { name: "الغردقة", nameEn: "Hurghada", icon: "🌊", popular: true, time: "6 ساعات" },
  { name: "شرم الشيخ", nameEn: "Sharm El-Sheikh", icon: "🤿", popular: true, time: "7 ساعات" },
  { name: "أسوان", nameEn: "Aswan", icon: "⛵", popular: false, time: "12 ساعة" },
  { name: "الأقصر", nameEn: "Luxor", icon: "🏺", popular: false, time: "10 ساعات" },
  { name: "مرسى مطروح", nameEn: "Marsa Matrouh", icon: "🌴", popular: false, time: "3 ساعات" },
  { name: "بورسعيد", nameEn: "Port Said", icon: "⚓", popular: false, time: "4.5 ساعة" },
  { name: "الإسماعيلية", nameEn: "Ismailia", icon: "🌉", popular: false, time: "3.5 ساعة" },
  { name: "طنطا", nameEn: "Tanta", icon: "🌾", popular: false, time: "2.5 ساعة" },
  { name: "المنصورة", nameEn: "Mansoura", icon: "🌿", popular: false, time: "2.5 ساعة" },
  { name: "المنيا", nameEn: "Minya", icon: "🏔️", popular: false, time: "6 ساعات" },
  { name: "سوهاج", nameEn: "Sohag", icon: "🏜️", popular: false, time: "8 ساعات" },
  { name: "بني سويف", nameEn: "Beni Suef", icon: "🌳", popular: false, time: "5 ساعات" },
];

export default function ServiceAreas() {
  const { language } = useLanguage();
  const ChevronIcon = language === "ar" ? ChevronLeft : ChevronRight;

  return (
    <section id="service-areas" className="py-6 px-3 sm:px-4 max-w-5xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] font-semibold mb-2">
          <Navigation className="w-3.5 h-3.5 text-gold-400" />
          <span>{language === "ar" ? "نغطي كل مصر" : "We Cover All Egypt"}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {language === "ar" ? (
            <>مناطق <span className="gold-text-gradient">الخدمة</span></>
          ) : (
            <>Service <span className="gold-text-gradient">Coverage</span></>
          )}
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-md mx-auto">
          {language === "ar"
            ? "من الإسكندرية نوصلك لأي محافظة في مصر — مطارات، منتجعات، ومحافظات بيّة"
            : "From Alexandria we reach any governorate in Egypt — airports, resorts, and all cities"}
        </p>
      </div>

      {/* Origin Badge */}
      <div className="flex justify-center mb-5">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500/15 to-gold-500/5 border border-gold-500/40 shadow-gold-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-xs font-black text-gold-300">
            {language === "ar" ? "📍 نقطة الانطلاق: الإسكندرية" : "📍 Starting Point: Alexandria"}
          </span>
          <div className="h-3 w-px bg-gold-500/40" />
          <span className="text-[10px] text-gray-400">
            {language === "ar" ? "جميع المناطق" : "All Districts"}
          </span>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-gold-400 mb-2.5 flex items-center gap-1">
          <span className="w-4 h-0.5 bg-gold-500/50" />
          {language === "ar" ? "الوجهات الأكثر طلباً" : "Most Popular Destinations"}
          <span className="w-4 h-0.5 bg-gold-500/50" />
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {GOVERNORATES.filter(g => g.popular).map((gov, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel rounded-xl border border-gold-500/20 p-2.5 flex items-center gap-2.5 hover:border-gold-500/40 transition-colors group cursor-default"
            >
              <span className="text-lg flex-shrink-0">{gov.icon}</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {language === "ar" ? gov.name : gov.nameEn}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-gold-400" />
                  <span className="text-[9px] text-gray-400">{gov.time}</span>
                </div>
              </div>
              <ChevronIcon className="w-3 h-3 text-gray-600 group-hover:text-gold-400 transition-colors mr-auto flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Governorates */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-2.5 flex items-center gap-1">
          <span className="w-4 h-0.5 bg-gray-600/50" />
          {language === "ar" ? "جميع محافظات مصر" : "All Egyptian Governorates"}
          <span className="w-4 h-0.5 bg-gray-600/50" />
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {GOVERNORATES.filter(g => !g.popular).map((gov, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-surface-secondary/60 border border-border-subtle hover:border-gray-600 transition-colors text-[11px] text-gray-300 group cursor-default"
            >
              <span className="text-sm">{gov.icon}</span>
              <span className="truncate">{language === "ar" ? gov.name : gov.nameEn}</span>
              <span className="text-[9px] text-gray-600 mr-auto hidden sm:block">{gov.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-500">
          {language === "ar"
            ? "✅ نغطي أيضاً: المهندسين، التجمع، أكتوبر، الشروق، العبور وجميع مناطق القاهرة الكبرى"
            : "✅ We also cover: Mohandeseen, New Cairo, 6th October, Shorouk, Obour and all Greater Cairo areas"}
        </p>
      </div>
    </section>
  );
}
